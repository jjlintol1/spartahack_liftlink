import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { IExerciseObject } from "../database/routine.model";

import queryString from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculates the total duration of the workout routine in seconds.
 *
 * @param {IExerciseObject[]} exercises - All of the exercises in the routine.
 * @returns {number} - The total duration of the workout in seconds.
 */
export function calculateWorkoutDuration(exercises: IExerciseObject[]) {
  let duration = 0;
  exercises.forEach((exercise: IExerciseObject) => {
      duration += (exercise.sets * (exercise.rest + 60)); // 60 seconds allotted to perform the set, added to the rest period
  });
  return duration;
}

interface IFormUrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export function formUrlQuery({ params, key, value }: IFormUrlQueryParams) {
  const parsed = queryString.parse(params);
  parsed[key] = value;
  return queryString.stringifyUrl({
    url: window.location.pathname,
    query: parsed
  },
  {
    skipNull: true,
    skipEmptyString: true
  }
  );
}

interface IRemoveKeysFromQueryParams {
  params: string;
  keysToRemove: string[];
}

export function removeKeysFromQuery({ params, keysToRemove }: IRemoveKeysFromQueryParams) {
  const parsed = queryString.parse(params);
  for (const key of keysToRemove) {
    delete parsed[key];
  };
  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: parsed
    },
    {
      skipEmptyString: true,
      skipNull: true
    }
  );
}

