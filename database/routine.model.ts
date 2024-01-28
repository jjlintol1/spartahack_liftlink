import { models, model, Schema, Document } from "mongoose";
import { IExercise } from "./exercise.model";

export interface IExerciseObject extends IExercise {
    exercise: Schema.Types.ObjectId;
    sets: number;
    repetitions: number;
    restPeriod: number;
}

export interface IExerciseRoutine extends Document {
    name: string;
    description?: string;
    duration?: number;
    // intensityLevel?: string;
    equipmentNeeded?: string;
    targetedMuscleGroups?: string[];
    exercises: IExerciseObject[];
    author: string;
    // tags?: string[];
    // images?: string[];
    // videos?: string[];
    upvotes: number;
    comments: Schema.Types.ObjectId[];
    createdAt?: Date;
    lastUpdated?: Date;
    // isPublic?: boolean;
    // targetedFitnessGoals?: string[];
    linkedSchedules?: Schema.Types.ObjectId[];
    // linkedUsers?: Schema.Types.ObjectId[];
  }

const routineSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number },
//   intensityLevel: { type: String },
  equipmentNeeded: { type: String },
  targetedMuscleGroups: [{ type: String }],
  exercises: [
    {
      name: { type: String, required: true },
      sets: { type: Number },
      repetitions: { type: Number },
      restPeriod: { type: Number }, // in seconds
    },
  ],
  author: { type: Schema.Types.ObjectId, ref: "User" }, // Assuming author is a username or user ID
//   tags: [{ type: String }],
//   images: [{ type: String }], // URLs of images
//   videos: [{ type: String }], // URLs of videos
  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  dateCreated: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },
//   isPublic: { type: Boolean, default: true },
//   targetedFitnessGoals: [{ type: String }],
  linkedSchedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
//   linkedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Routine = models.Routine || model('Routine', routineSchema);

export default Routine;
