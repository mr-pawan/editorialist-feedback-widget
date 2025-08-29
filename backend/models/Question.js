import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        questionId: { type: Number, required: true, unique: true },
        question: { type: String, required: true },
        type: { type: String, enum: ["yesno", "star-rating"], required: true },
    },
    { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
