
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const blogRoutes = require("./routes/blog");

const app = express();

// DB
connectDB();
// console.log("MONGODB_URI:", process.env.MONGODB_URI);

// Middleware



app.use(
  cors({
    origin: [
      "https://blog-app-pi-seven-35.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);


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
