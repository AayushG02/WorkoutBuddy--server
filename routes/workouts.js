const express = require("express");
const router = express.Router();
const {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteSingleWorkout,
  updateWorkout,
} = require("../controllers/workoutController");
const requireAuth = require("../middleware/requireAuth");

// require auth for all workout paths
router.use(requireAuth);

// GET all workouts
router.get("/", getWorkouts);

// GET single workout
router.get("/:id", getSingleWorkout);

// POST a workout
router.post("/", createWorkout);

// DELETE a workout
router.delete("/:id", deleteSingleWorkout);

// UPDATE a workout
router.patch("/:id", updateWorkout);
module.exports = router;
