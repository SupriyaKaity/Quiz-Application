import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createResult,
  listResults,
  deleteResult,
} from "../controllers/resultController.js";

const resultRouter = express.Router();

resultRouter.post("/", authMiddleware, createResult);
resultRouter.get("/", authMiddleware, listResults);
resultRouter.delete("/:id", authMiddleware, deleteResult);

export default resultRouter;
