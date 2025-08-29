import Question from "../models/Question.js";

// Create question (Admin only)
export const createQuestion = async (req, res) => {
    try {
        const { questionId, question, type } = req.body;
        const newQuestion = new Question({ questionId, question, type });
        await newQuestion.save();
        res.status(201).json({ message: "Question created", question: newQuestion });
    } catch (err) {
        res.status(500).json({ message: "Error creating question", error: err.message });
    }
};

// Update question
export const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Question.findOneAndUpdate(
            { questionId: id },
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Question not found" });
        res.json({ message: "Question updated", question: updated });
    } catch (err) {
        res.status(500).json({ message: "Error updating question", error: err.message });
    }
};

// Get all questions
export const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find({});
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: "Error fetching questions", error: err.message });
    }
};

// DELETE /api/questions/:id
export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Question.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting question", error: err.message });
    }
};

