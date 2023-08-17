const mongoose = require("mongoose");
const WorkoutModel = require("../models/WorkoutModel");

const getWorkouts = async (req, res) => {
  const uid = req.user._id;
  try {
    const workouts = await WorkoutModel.find({ uid }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
  }
};

const getSingleWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }
    const foundWorkout = await WorkoutModel.find({ _id: id });
    if (!foundWorkout) {
      res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(foundWorkout);
  } catch (err) {
    console.log(err);
  }
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  const emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    res
      .status(400)
      .json({ error: "Please fill in all empty fields!", emptyFields });
  }
  try {
    const uid = req.user._id;
    const workout = await WorkoutModel.create({
      title,
      load,
      reps,
      uid,
    });
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
  }
};

const deleteSingleWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }
    const workout = await WorkoutModel.findByIdAndDelete({ _id: id });
    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
  }
};

const updateWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }
    const workout = await WorkoutModel.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteSingleWorkout,
  updateWorkout,
};
