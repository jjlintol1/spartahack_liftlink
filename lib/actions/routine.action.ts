"use server"

import Routine from "@/database/routine.model";
import { connectToDatabase } from "../mongoose"
import Exercise from "@/database/exercise.model";
import { revalidatePath } from "next/cache";
import { ICreateRoutineParams, IGetRoutineByIdParams, IGetRoutinesParams } from "@/types/shared";

import { calculateWorkoutDuration } from "@/lib/utils";
import User from "@/database/user.model";

export async function createRoutine(params: ICreateRoutineParams) {
    try {
        connectToDatabase();
        const { 
            title,
            description,
            exercises,
            author,
            equipmentNeeded,
            targetedMuscleGroups,
            path
        } = params;

        const duration = calculateWorkoutDuration(exercises);

        const routine = await Routine.create({
            title,
            description,
            duration,
            equipmentNeeded,
            targetedMuscleGroups,
            exercises,
            author,
        });

        for (const exercise of exercises) {
            // Add the routine to the exercise's linkedRoutines array
            const searchedExercise = await Exercise.findById(exercise.exercise);
            if (searchedExercise.routines) {
                searchedExercise.routines.push(routine._id);
            } else {
                searchedExercise.routines = [routine._id];
            }
            await searchedExercise.save();
        }

        revalidatePath(path);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getRoutines(params: IGetRoutinesParams) {
    try {
        connectToDatabase();
        const routines = await Routine.find({})
            .populate({
                path: "author",
                model: User,
                select: "_id clerkId name picture"
            });
        return {
            routines
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getRoutineById(params: IGetRoutineByIdParams) {
    try {
        const { routineId } = params;

        const routine = await Routine.findById(routineId);

        return routine;
    } catch (error) {
        console.log(error);
        throw error;
    }
}