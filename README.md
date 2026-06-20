"# BlogApp

A full-stack MERN blog application with user authentication, blog creation, editing, likes, and comments.

## Overview

This repository contains a blog platform built with:
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT authentication
- **Frontend:** React, Vite, Tailwind CSS

Users can register, log in, create blog posts, edit and delete their own posts, and browse blog content.

## Repository Structure

```
Backend/    # API server and database logic
Frontend/   # React client application
```

## Backend Setup

1. Open a terminal in `Backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

By default, the backend runs on `http://localhost:5000`.

## Frontend Setup

1. Open a terminal in `Frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend runs by default on `http://localhost:5173`.

## Available Scripts

### Backend
- `npm start` - start the Express server

### Frontend
- `npm run dev` - start Vite development server
- `npm run build` - build production bundle
- `npm run preview` - preview production build locally
- `npm run deploy` - deploy to GitHub Pages (configured in frontend package.json)

## Notes

- The backend includes CORS settings for `http://localhost:5173` and a deployed frontend origin.
- Make sure MongoDB is running and the `.env` values are configured correctly before starting the backend.

## Project Highlights

- JWT-based authentication and protected routes
- Blog CRUD operations
- Frontend routing with React Router
- Tailwind CSS for styling

## License

This project is currently unlicensed. Add a license file if you want to make it open source.
" 
