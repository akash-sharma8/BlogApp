# Backend for MERN Blog Application

This is the backend API for a full-stack blog application built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides authentication, blog management, comments, and likes functionality.

## Features

- User registration and login with JWT authentication
- Create, read, update, and delete blog posts
- Blog categories and image support
- Like and comment on blog posts
- Secure API with middleware for authentication
- CORS enabled for frontend integration

## Technologies Used

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database
- **Mongoose**: ODM for MongoDB
- **JWT (jsonwebtoken)**: For token-based authentication
- **bcrypt**: For password hashing
- **cookie-parser**: For parsing cookies
- **CORS**: For cross-origin resource sharing
- **dotenv**: For environment variable management

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mern_project/blog/Backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Start the server:
   ```
   npm start
   ```

The server will run on `http://localhost:5000` by default.

## API Endpoints

### Authentication Routes (`/api/auth`)

- `POST /api/auth/user/register`: Register a new user
  - Body: `{ "username": "string", "email": "string", "password": "string" }`

- `POST /api/auth/user/login`: Login a user
  - Body: `{ "email": "string", "password": "string" }`

### Blog Routes (`/api/blog`)

- `GET /api/blog/blogs`: Get all blogs (public)
- `POST /api/blog/blogs`: Create a new blog (requires authentication)
  - Body: `{ "title": "string", "content": "string", "image": "string", "category": "string" }`
- `PUT /api/blog/blogs/:id`: Update a blog (requires authentication, author only)
  - Body: `{ "title": "string", "content": "string", "image": "string", "category": "string" }`
- `DELETE /api/blog/blogs/:id`: Delete a blog (requires authentication, author only)

## Project Structure

```
Backend/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── blogController.js  # Blog CRUD operations
│   └── userController.js  # User authentication
├── middleware/
│   └── authMiddleware.js  # JWT authentication middleware
├── models/
│   ├── blogModel.js       # Blog schema
│   ├── commentModel.js    # Comment schema
│   ├── likesModel.js      # Likes schema
│   └── userModel.js       # User schema
├── routes/
│   ├── auth.js            # Authentication routes
│   └── Blog.js            # Blog routes
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
├── server.js              # Main server file
└── Readme.md              # This file
```

## Usage

1. Ensure MongoDB is running and accessible.
2. Set up the environment variables in `.env`.
3. Run the server with `npm start`.
4. The API will be available at `http://localhost:5000`.
5. Use tools like Postman or curl to test the endpoints.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request.

## License

This project is licensed under the ISC License.