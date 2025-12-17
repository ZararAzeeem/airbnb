const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema, reviewSchema } = require('./schema.js');
const Review = require('./models/review.js');

const User = require('./models/user.js');

const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Agar user routes './models/user.js' mein nahi hain toh path change karein.
const userRouter = require('./routes/user.js');
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const session = require('express-session');

main()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log('Database connection failed:', err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  // console.log(result);
  if (error) {
    // 404 is generally for 'Not Found', 400 is better for 'Bad Request/Validation Error'
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

//Cookie
const sessionOptions = {
  secret: 'mysupersecretcode',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// Root route
app.get('/', (req, res) => {
  res.send('Hi I am root');
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

///Middle ware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user; // Ye line bhi add krni chahiye authentication ke liye
  next();
});

app.get('/demouser', async (req, res) => {
  let fakeUser = new User({
    email: 'student@gmail.com',
    username: 'delta-student',
  });

  let registeredUser = await User.register(fakeUser, 'helloworld');
  res.send(registeredUser); // Response bhejna zaroori hai
});

app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/', userRouter);

// If no route matched → 404
app.use((req, res, next) => {
  next(new ExpressError(404, 'Page Not Found!'));
});

// Custom error handler middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).render('error.ejs', { message }); // Status code set kiya
  // res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log('Server is listening to port 8080');
});
