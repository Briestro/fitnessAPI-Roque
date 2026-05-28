const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");
const auth = require("../auth");

// All workout routes are protected
router.use(auth);

// POST /workouts/addWorkout
router.post("/addWorkout", async (req, res) => {
  try {
    const { name, duration, userId } = req.body;
    const workout = new Workout({ userId, name, duration });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /workouts/getMyWorkouts
router.get("/getMyWorkouts", async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    res.status(200).json({ workouts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /workouts/updateWorkout/:id
router.patch("/updateWorkout/:id", async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.status(200).json({ updatedWorkout: workout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /workouts/deleteWorkout/:id
router.delete("/deleteWorkout/:id", async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /workouts/completeWorkoutStatus/:id
router.patch("/completeWorkoutStatus/:id", async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { status: "completed" },
      { new: true }
    );
    if (!workout) return res.status(404).json({ message: "Workout not found" });
    res.status(200).json({ updatedWorkout: workout });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;