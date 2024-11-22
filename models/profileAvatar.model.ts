import mongoose, { Schema, Document } from "mongoose";

export interface ProfileAvatar extends Document {
  url?: string;
}

const profileAvatarSchema: Schema<ProfileAvatar> = new mongoose.Schema({
  url: {
    type: String,
  },
});

export default mongoose.model("ProfileAvatar", profileAvatarSchema);
