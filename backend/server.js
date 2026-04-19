import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import resultRouter from "./routes/resultRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9999;

console.log("JWT_SECRET loaded:", process.env.JWT_SECRET ? "Yes" : "No");

// MIDDLEWARE
app.use(cors());
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

// DB
connectDB();

// ROUTES
app.use("/api/auth", userRouter);
app.use("/api/results", resultRouter);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});
