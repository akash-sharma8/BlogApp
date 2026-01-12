require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/Blog");

const app = express();

// DB
connectDB();

// Middleware
app.use(cors({
  origin: "https://blog-app-pi-seven-35.vercel.app"
}));


app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is live" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
