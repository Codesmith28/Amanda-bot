import { Schema, Document, model } from "mongoose";

export interface UserDocument extends Document {
  userId: string;
  guildId: string;
  points: number;
  lastDaily: Date;
  data: string[];
}

const userSchema = new Schema<UserDocument>({
  userId: {
    type: String,
    required: true,
  },
  guildId: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
  lastDaily: {
    type: Date,
    required: true,
  },
  data: [
    {
      type: String,
      default: "Dobby",
    },
  ],
});

const User = model<UserDocument>("User", userSchema);

export default User;
