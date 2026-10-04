# Residence 🏠

Residence is a full-stack property listing web application built using Node.js, Express.js, MongoDB, and EJS.

The project allows users to create, view, edit, and delete property listings and add reviews to listings.

## 🚀 Features

- View all property listings
- View details of an individual listing
- Create new listings
- Edit existing listings
- Delete listings
- Add reviews to listings
- Delete reviews
- Joi-based request validation
- MongoDB database integration
- Mongoose schemas and relationships
- Express routing using modular routers
- EJS templating
- Bootstrap-based responsive UI
- Method override for PUT and DELETE requests
- Custom Express error handling

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- Bootstrap
- EJS

### Backend
- Node.js
- Express.js
- EJS / EJS-Mate

### Database
- MongoDB
- Mongoose

### Validation
- Joi

### Other
- Method Override
- Nodemon

## 📂 Project Structure

```text
Residence/
│
├── models/
│   ├── listings.js
│   └── reviews.js
│
├── routes/
│   ├── listing.js
│   └── review.js
│
├── views/
│   ├── layouts/
│   ├── listings/
│   └── includes/
│
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   └── ExpressError.js
│
├── schema.js
├── app.js
├── package.json
└── README.md