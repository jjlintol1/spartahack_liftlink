import { IUser } from "./user";

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

export interface IGetExercisesParams {
  query?: string;
  page?: number;
  pageSize?: number;
}
