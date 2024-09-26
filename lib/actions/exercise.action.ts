"use server"

import { IGetExercisesParams } from "@/types/shared";
import { connectToDatabase } from "../mongoose"

import { FilterQuery } from "mongoose";

import Exercise from "@/database/exercise.model";

export async function getExercises(params: IGetExercisesParams) {
    try {
        connectToDatabase();
        const { 
            searchQuery, 
            page = 1, 
            pageSize = 10 
        } = params;

        const skipAmount = (page - 1) * pageSize;

        const query: FilterQuery<typeof Exercise> = {};

        if (searchQuery) {
            query.name = { $regex: searchQuery, $options: "i" }
        };

        const exercises = await Exercise.find(query)
            .skip(skipAmount)
            .limit(pageSize)
            .sort({ name: 1 });
        
        return {
            exercises: JSON.parse(JSON.stringify(exercises)),
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}