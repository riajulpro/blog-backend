import mongoose, { Document, Schema } from "mongoose";

interface ITags extends Document {
  name: string;
}

const TagSchema: Schema = new mongoose.Schema({
  name: { type: String, unique: true },
});

export default mongoose.model<ITags>("Tag", TagSchema);
