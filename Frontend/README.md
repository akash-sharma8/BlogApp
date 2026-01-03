# Blog Frontend

This is the frontend application for a MERN stack blog platform. It provides a user interface for creating, reading, and managing blog posts, user authentication, and more.

## Features

- User registration and login
- Create, edit, and delete blog posts
- View blog posts
- User profiles with authored blogs
- Responsive design with Tailwind CSS
- Private routes for authenticated users

## Tech Stack

- **React**: JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Linting utility for JavaScript
- **Prettier**: Code formatter
- **PostCSS**: Tool for transforming CSS

## Installation

1. Ensure you have Node.js installed (version 14 or higher).
2. Navigate to the Frontend directory:
   ```
   cd Frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the development server:
   ```
   npm run dev
   ```
   The application will be available at `http://localhost:5173` (default Vite port).

2. Build for production:
   ```
   npm run build
   ```

3. Preview the production build:
   ```
   npm run preview
   ```

## Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run lint`: Run ESLint to check for code issues
- `npm run preview`: Preview the production build locally

## Project Structure

```
Frontend/
├── .gitignore             # Git ignore rules
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML template
├── node_modules/          # Node.js dependencies
├── package-lock.json      # Lockfile for dependencies
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.js         # Vite configuration
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Auth/          # Authentication components (Login, Register, PrivateRoute)
│   │   ├── Blog/          # Blog-related components (BlogCard)
│   │   └── Layout/        # Layout components (Navbar, Footer)
│   ├── context/           # React context for state management (AuthContext)
│   ├── pages/             # Page components (Home, BlogDetail, EditBlog, Profile, Write, NotFound)
│   ├── utils/             # Utility functions (API calls)
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── index.css          # Global styles
└── README.md              # This file
```

## API Integration

This frontend communicates with the backend API located in the `../Backend` directory. Ensure the backend server is running for full functionality.

## File Descriptions

### Configuration Files

- **package.json**: Defines the project metadata, dependencies (React, React DOM, React Router DOM, Axios), dev dependencies (Vite, Tailwind CSS, ESLint, Prettier, and others), and scripts for development, building, linting, and previewing.
- **vite.config.js**: Vite configuration file that sets up the React plugin for fast development and building.
- **tailwind.config.js**: Tailwind CSS configuration specifying content paths for purging unused styles and extending the theme.
- **eslint.config.js**: ESLint configuration (currently empty, but intended for linting rules).
- **postcss.config.js**: PostCSS configuration with Tailwind and Autoprefixer plugins for CSS processing.
- **index.html**: The main HTML template with the root div for React mounting and script tag for the main entry point.
- **.gitignore**: Specifies files and directories to ignore in version control, including logs, node_modules, build outputs, and editor files.

### Source Code (src/)

- **main.jsx**: The entry point that renders the App component into the DOM using ReactDOM, wrapped in StrictMode for development checks.
- **App.jsx**: The root component that sets up routing with React Router, provides authentication context, and includes the Navbar and Footer. Defines routes for Home, Login, Register, Blog details, Edit Blog (protected), Profile (protected), Write (protected), and 404.
- **index.css**: Imports Tailwind's base, components, and utilities styles for global styling.

#### Components (src/components/)

- **Auth/Login.jsx**: A form component for user login, handling email/password input, API call to login endpoint, and navigation on success.
- **Auth/Register.jsx**: A form component for user registration, collecting username, email, password, and posting to the register endpoint.
- **Auth/PrivateRoute.jsx**: A wrapper component that checks if the user is authenticated; if not, redirects to login.
- **Blog/BlogCard.jsx**: Displays a blog preview with title, description, and a link to the full blog post.
- **Layout/Navbar.jsx**: The navigation bar showing the app title, conditional links based on auth status (Write for logged-in users, Login/Register otherwise), and logout functionality.
- **Layout/Footer.jsx**: A simple footer with copyright information.

#### Context (src/context/)

- **AuthContext.jsx**: Provides authentication state management using React Context. Handles user login/logout, persists user data in localStorage, and offers user state to child components.

#### Pages (src/pages/)

- **Home.jsx**: Fetches and displays a list of all blogs using BlogCard components.
- **BlogDetail.jsx**: Displays a single blog post based on the URL parameter ID, fetched from the API. Allows editing and deleting if the user is the author.
- **EditBlog.jsx**: A form for editing existing blog posts, pre-filled with current data, allowing updates to title and content.
- **Profile.jsx**: Displays the user's profile, showing a list of blogs authored by the current user.
- **Write.jsx**: A form for creating new blog posts, with fields for title, category, and content, posting to the API.
- **NotFound.jsx**: A 404 error page shown for unmatched routes.

#### Utils (src/utils/)

- **api.jsx**: Axios instance configured with base URL pointing to the backend API, automatic token attachment for authenticated requests, and credentials enabled.
- **authApi.jsx**: Contains API functions for authentication: login, register, and logout.
- **blogApi.jsx**: Contains API functions for blog operations: get all blogs, get single blog, create, update, delete blog, like blog, and comment on blog.

### Public/

- Contains static assets (currently empty in the provided structure).

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.