# Residence – Property Listing Web Application

Residence is a full-stack property listing web application where users can explore available properties, create their own listings, upload property images, and share reviews. It provides user authentication, listing management, and location-based map visualization.

## Features

- **User Authentication:** Secure signup, login, and logout using Passport.js and session-based authentication.
- **Property Listings:** Browse all available properties and view individual listing details.
- **Listing Management:** Authenticated users can create, edit, and delete property listings.
- **Image Uploads:** Upload and manage property images using Cloudinary.
- **Reviews & Ratings:** Users can add and delete reviews for property listings.
- **Location Visualization:** Integrated Mapbox to display property locations on an interactive map.
- **Form Validation:** Server-side validation using Joi.
- **Flash Messages:** Display success and error notifications for user actions.
- **Responsive UI:** Bootstrap-based interface for different screen sizes.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | HTML, CSS, Bootstrap, EJS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | Passport.js, Passport Local, Express Session |
| Image Storage | Cloudinary, Multer |
| Maps & Geocoding | Mapbox |
| Validation | Joi |
| Other Tools | Git, GitHub, Method Override, Connect Flash |

## Project Structure

```text
Residence/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── public/
│   ├── css/
│   └── JS/
│
├── middleware.js
├── schema.js
├── app.js
├── cloudConfig.js
├── package.json
└── .gitignore
```

## Installation & Setup

Follow these steps to run Residence locally.

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/Residence.git
```

### 2. Navigate to the project directory

```bash
cd Residence
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the root directory and add your credentials:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_public_token
```

Make sure the variable names match those used in your application configuration.

### 5. Start the application

For development:

```bash
npm start
```

Or, if you use Nodemon:

```bash
nodemon app.js
```

Open your browser and visit:

```text
http://localhost:8080/listings
```



## Author

**Kartikey Singh**

---

*Residence is a full-stack learning project developed to gain practical experience in backend development, database management, authentication, and third-party API integration.*