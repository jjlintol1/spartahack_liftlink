import { models, model, Schema, Document } from "mongoose";

export interface IExerciseObject {
    exercise: Schema.Types.ObjectId;
    sets: number;
    repetitions: number;
    restPeriod: number;
}

export interface IExerciseRoutine extends Document {
    name: string;
    description?: string;
    duration?: number;

    equipmentNeeded?: string;
    targetedMuscleGroups?: string[];
    exercises: IExerciseObject[];
    author: string;

    upvotes: number;
    comments: Schema.Types.ObjectId[];
    createdAt?: Date;
    lastUpdated?: Date;

    linkedSchedules?: Schema.Types.ObjectId[];

  }

const routineSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  duration: { type: Number },

  equipmentNeeded: { type: String },
  targetedMuscleGroups: [{ type: String }],
  exercises: [
    {
      exercise: { type: Schema.Types.ObjectId, ref: "Exercise" },
      sets: { type: Number },
      repetitions: { type: Number },
      restPeriod: { type: Number }, // in seconds
    },
  ],
  author: { type: Schema.Types.ObjectId, ref: "User" }, // Assuming author is a username or user ID

  upvotes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  dateCreated: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now },

  linkedSchedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule' }],
});

const Routine = models.Routine || model('Routine', routineSchema);

export default Routine;
