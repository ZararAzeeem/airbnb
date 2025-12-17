#  WanderLust – Airbnb Clone (Full-Stack MEN Project)

A full-stack web application inspired by **Airbnb**, built using the **MEN Stack** (MongoDB, Express.js, Node.js). The project allows users to explore travel listings and manage destinations through a clean and structured interface.

> **Note:** This project is built using **Server-Side Rendering (SSR)**. Instead of React or any frontend framework, it uses **EJS (Embedded JavaScript Templates)** for dynamic page rendering.

---

##  Key Features

* **Listings Management (CRUD):** Create, view, update, and delete travel listings.
* **Server-Side Rendering:** Dynamic pages rendered using EJS templates.
* **MongoDB Integration:** Data stored and managed using MongoDB with Mongoose ODM.
* **RESTful Routing:** Clean and structured routes following REST principles.
* **Reusable Layouts:** Common navbar and footer across pages.
* **Auto Reload:** Development-friendly setup using Nodemon.
* **Responsive UI:** Simple and responsive design using modern CSS and Bootstrap.

---

## 🛠️ Tech Stack

| Technology       | Usage                              |
| :--------------- | :--------------------------------- |
| **Node.js**      | Runtime Environment                |
| **Express.js**   | Backend Web Framework              |
| **MongoDB**      | NoSQL Database                     |
| **Mongoose**     | MongoDB Object Data Modeling (ODM) |
| **EJS**          | Server-Side Templating Engine      |
| **Bootstrap 5**  | Styling & Responsive Design        |
| **Nodemon**      | Development Auto-Restart Tool      |
| **Git & GitHub** | Version Control                    |

---
## Secreenshot
<img width="1354" height="683" alt="image" src="https://github.com/user-attachments/assets/7eca38ea-4963-4d35-bdc1-fff37387ca08" />


## 📂 Project Structure

```
WanderLust/
│
├── models/        # Mongoose schemas
├── routes/        # Express routes
├── views/         # EJS templates
│   ├── layouts/
│   └── listings/
├── public/        # Static assets (CSS, images)
├── app.js         # Main application entry point
├── package.json
└── README.md
```

---

##  Installation & Setup

Follow the steps below to run the project locally:

### 1 Clone the Repository

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

### 2 Install Dependencies

```bash
npm install
```

### 3 Start MongoDB

Ensure MongoDB is running on your system:

* **Windows:** `services.msc` → Start **MongoDB Server**

### 4 Run the Application

```bash
nodemon app.js
```

The server will start at:

```
http://localhost:8080
```

---

##  Database Seeding (Optional)

You can manually add sample listings using Mongo Shell:

```js
use test

db.listings.insertOne({
  title: "Hunza Valley Tour",
  description: "Beautiful mountain destination with scenic views",
  price: 25000,
  location: "Hunza",
  country: "Pakistan"
})
```

---

##  Future Enhancements

* User Authentication & Authorization
* Image Uploads
* Reviews & Ratings System
* Search & Filter Functionality
* Map Integration

---

##  License

This project is created for **learning and educational purposes**.

---

##  Author

**Zarar Azeem**
Web Developer | Graphic Designer | Data Scientist

---

⭐ If you find this project useful, consider giving it a star on GitHub!
