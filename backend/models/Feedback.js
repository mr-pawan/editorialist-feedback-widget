import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        questionId: { type: Number, required: true },
        question: { type: String, required: true },
        type: { type: String, enum: ["yesno", "star-rating"], required: true },
        value: { type: mongoose.Schema.Types.Mixed }, // Yes/No or number (1–5)
        text: { type: String }, // optional comment
        status: { type: String, enum: ["pending", "done"], default: "pending" },
    },
    { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
