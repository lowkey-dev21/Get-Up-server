import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  _doc?: string;
  starter?: boolean;
  coach?: string;
  gender?: string;
  area?: string;
  goal?: string;
  ageRange?: string;
  profilePicture?: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  starter: {
    type: Boolean,
    default: true,
  },
  coach: {
    type: String,
  },
  gender: {
    type: String,
  },
  area: {
    type: String,
  },
  goal: {
    type: String,
  },
  ageRange: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

export default mongoose.model<IUser>("User", userSchema);
