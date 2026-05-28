const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use("/users", userRoutes);
app.use("/workouts", workoutRoutes);

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGODB_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    if (require.main === module) {
      app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 4000}`);
      });
    }
  })
  .catch(err => console.log(err));

module.exports = { app, mongoose };