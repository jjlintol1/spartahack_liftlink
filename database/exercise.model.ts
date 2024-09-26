import { Document, Schema, models, model } from 'mongoose';

export interface IExercise extends Document {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: number;
  name: string;
  target: string;
  routines: Schema.Types.ObjectId[];
}

const exerciseSchema = new Schema<IExercise>(
  { 
    bodyPart: { type: String, required: true },
    equipment: { type: String, required: true },
    gifUrl: { type: String, required: true },
    id: { type: Number, required: true },
    name: { type: String, required: true },
    target: { type: String, required: true },
    routines: [{ type: Schema.Types.ObjectId, ref: 'Routine' }]
  },
);

const Exercise = models.Exercise || model<IExercise>('Exercise', exerciseSchema);

export default Exercise;
