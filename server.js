const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/books", require("./routes/bookRoutes"));
app.use("/auth", require("./routes/authRoutes"));

if (process.env.NODE_ENV !== "test") {
  // Avoid running during tests
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
