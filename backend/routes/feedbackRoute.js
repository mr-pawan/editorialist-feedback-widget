import express from "express";
import { getUserFeedback, submitFeedback, createFeedback, getAllFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/:userId", getUserFeedback); // User: get questions+feedback
router.post("/", submitFeedback);        // User: submit feedback
router.get("/", getAllFeedback);    // admin fetch all feedback

export default router;
