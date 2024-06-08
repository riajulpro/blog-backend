import mongoose, { Document, Schema } from "mongoose";

interface People extends Document {
  name: string;
  email: string;
}

const PeopleSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export default mongoose.model<People>("People", PeopleSchema);
