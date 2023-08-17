require("dotenv").config();
const express = require("express");
const app = express();
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors());
app.use(express.json()); // any request that comes in, parse the body of the request into json
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to DB and listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
