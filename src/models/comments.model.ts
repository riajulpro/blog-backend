import mongoose, { Document, Schema } from "mongoose";

interface IComment extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  article: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new mongoose.Schema({
  content: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "People" },
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
});

export default mongoose.model<IComment>("Comment", CommentSchema);
