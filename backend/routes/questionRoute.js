import express from "express";
import { createQuestion, updateQuestion, getQuestions, deleteQuestion } from "../controllers/questionController.js";

const router = express.Router();

router.post("/", createQuestion);      // Admin: Create
router.put("/:id", updateQuestion);    // Admin: Update
router.get("/", getQuestions);         // Admin/User: List
router.delete("/:id", deleteQuestion);   // ✅ Admin delete route

export default router;
