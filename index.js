import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/user.js";
import resetRoute from "./routes/reset.js";
import changePasswordRoute from "./routes/changePassword.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("SCHS Homework app running");
});

app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);
app.use("/user", userRoutes);
app.post("/reset-password", resetRoute);
app.post("/change-password", changePasswordRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`)))
  .catch((error) => console.log(error.message));
