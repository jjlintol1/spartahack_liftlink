"use server"

import { IGetExercisesParams } from "@/types/shared";
import { connectToDatabase } from "../mongoose"

import Exercise from "@/database/exercise.model";

export async function getExercises(params: IGetExercisesParams) {
    try {
        connectToDatabase();
        const { 
            // query, 
            page = 1, 
            pageSize = 10 
        } = params;

        const exercises = await Exercise.find({})
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .sort({ name: 1 });
        
        return {
            exercises
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}