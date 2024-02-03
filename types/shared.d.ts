import { IExerciseObject } from "@/database/routine.model";
import { IUser } from "./user";
import { Schema } from "mongoose";

// User Action Types
export interface IGetUserByIdParams {
  userId: string;
}

export interface ICreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface IUpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface IDeleteUserParams {
  clerkId: string;
}

// Exercise Action Types
export interface IGetExercisesParams {
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}

// Routine Action Types
export interface ICreateRoutineParams {
  title: string;
  description?: string;
  exercises: IExerciseObject[];
  author: Schema.Types.ObjectId;
  equipmentNeeded?: string[];
  targetedMuscleGroups?: string[];
  path: string;
}

export interface IGetRoutinesParams {
  searchQuery?: string;
  page?: number;
  pageSize?: number;
}

export interface IGetRoutineByIdParams {
  routineId: string;
}
