import mongoose, { Document, Schema } from "mongoose";

interface IArticle extends Document {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  categories: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
}

const ArticleSchema: Schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "People",
    required: true,
  },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true }],
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  ],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Article", ArticleSchema);
