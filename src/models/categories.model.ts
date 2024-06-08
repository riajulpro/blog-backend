import mongoose, { Document, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;
}

const CategorySchema: Schema = new mongoose.Schema({
  name: { type: String, unique: true },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
