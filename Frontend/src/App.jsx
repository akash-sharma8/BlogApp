import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Pages
import Home from './pages/Home';
import Write from './pages/Write';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import BlogDetail from "./pages/BlogDetail";
import EditBlog from './pages/EditBlog';
import MyBlogs from './pages/MyBLogs';


// Auth
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute'; // ✅ import, do not redeclare

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/myblogs"
          element={
            <PrivateRoute>
              <MyBlogs />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route
          path="/write"
          element={
            <PrivateRoute>
              <Write />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-blog/:id"
          element={
            <PrivateRoute>
              <EditBlog />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
