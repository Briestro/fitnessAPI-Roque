const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");
const auth = require("../auth");


// POST /addWorkout
router.post("/addWorkout", auth, async (req, res) => {
  try {
    const { name, duration } = req.body;
    const workout = new Workout({ userId: req.user.id, name, duration });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /getMyWorkouts
router.get("/getMyWorkouts", auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id });
    res.status(200).json({ workouts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /updateWorkout/:id
router.patch("/updateWorkout/:id", auth, async (req, res) => {
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

// DELETE /deleteWorkout/:id
router.delete("/deleteWorkout/:id", auth, async (req, res) => {
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

// PATCH /completeWorkoutStatus/:id
router.patch("/completeWorkoutStatus/:id", auth, async (req, res) => {
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