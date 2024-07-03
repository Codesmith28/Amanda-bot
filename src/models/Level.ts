import { Schema, Document, model } from "mongoose";

// Define interface for the document structure
export interface LevelDocument extends Document {
  username: string;
  role: string;
  xp: number;
  level: number;
  name: string;
}

// Create the schema using TypeScript's type annotations
const levelSchema = new Schema<LevelDocument>({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  xp: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
});

// Define and export the model with LevelDocument type
const Level = model<LevelDocument>("Level", levelSchema);

export default Level;
