import { Document, Schema, model, models } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  routines: Schema.Types.ObjectId[];
  schedules: Schema.Types.ObjectId[];
  saved: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String, required: true },
  location: { type: String },
  routines: [{ type: Schema.Types.ObjectId, ref: "Routine" }],
  schedules: [{ type: Schema.Types.ObjectId, ref: "Schedule" }],
  saved: [{ type: Schema.Types.ObjectId, ref: "Routine" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("User", userSchema);

export default User;
