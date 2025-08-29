import Feedback from "../models/Feedback.js";
import Question from "../models/Question.js";

// Get user questions with feedback status
export const getUserFeedback = async (req, res) => {
    const { userId } = req.params;

    try {
        const questions = await Question.find({});
        const feedbacks = await Feedback.find({ userId });

        const result = questions.map((q) => {
            const existing = feedbacks.find((f) => f.questionId === q.questionId);
            return existing
                ? existing
                : {
                    userId,
                    questionId: q.questionId,
                    question: q.question,
                    type: q.type,
                    value: null,
                    text: "",
                    status: "pending",
                };
        });

        res.json(result);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user feedback", error: err.message });
    }
};

// Submit feedback
export const submitFeedback = async (req, res) => {
    try {
        const { userId, questionId, question, type, value, text } = req.body;

        let feedback = await Feedback.findOne({ userId, questionId });

        if (feedback) {
            feedback.value = value;
            feedback.text = text;
            feedback.status = "done";
            await feedback.save();
        } else {
            feedback = new Feedback({
                userId,
                questionId,
                question,
                type,
                value,
                text,
                status: "done",
            });
            await feedback.save();
        }

        res.status(200).json({ message: "Feedback saved", feedback });
    } catch (err) {
        res.status(500).json({ message: "Error saving feedback", error: err.message });
    }
};

export const createFeedback = async (req, res) => {
    try {
        const feedbacks = req.body; // array
        const saved = await Feedback.insertMany(feedbacks);
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all feedback (admin use)
export const getAllFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find().populate("questionId").exec();
        res.status(200).json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}