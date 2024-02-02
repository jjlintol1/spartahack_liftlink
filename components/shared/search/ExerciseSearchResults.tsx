"use client";

import React, { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams } from "next/navigation";
import { getExercises } from "@/lib/actions/exercise.action";
import Image from "next/image";
import { Button } from "@/components/ui/button";


interface ISearchResultProps {
  _id: string;
  name: string;
  gifUrl: string;
  bodyPart: string;
  target: string;
  form: any;
  setIsOpen: (isOpen: boolean) => void;
  setTerm: (term: string) => void;
}

const SearchResult = ({
  _id,
  name,
  gifUrl,
  bodyPart,
  target,
  form,
  setIsOpen,
  setTerm,
}: ISearchResultProps) => {
  

  const handleAddExercise = () => {
    const exercises = form.getValues("exercises");
    console.log(exercises);
    form.setValue("exercises", [
      ...exercises,
      {
        mongoId: _id,
        name,
        sets: 3,
        reps: 10,
        rest: 60,
      },
    ]);

    setIsOpen(false);
    setTerm("");
  };
  return (
    <div className="flex-between w-full px-6">
      <div>
        <p className="base-medium text-dark300_light700 line-clamp-1 capitalize">
          {name}
        </p>
        <div className="mt-2 flex gap-5">
          <div className="flex gap-2">
            <Image
              src="/assets/icons/muscle.svg"
              alt="body part"
              height={18}
              width={18}
              className="invert-0 dark:invert"
            />
            <p className="text-dark300_light700 body-regular">{bodyPart}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/crosshair.svg"
              alt="body part"
              height={18}
              width={18}
              className="invert-0 dark:invert"
            />
            <p className="text-dark300_light700 body-regular">{target}</p>
          </div>
        </div>
      </div>
      <Button onClick={handleAddExercise}>
        <Image
          src="/assets/icons/add.svg"
          alt="add exercise"
          width={30}
          height={30}
          className="cursor-pointer invert-0 dark:invert"
        />
      </Button>
    </div>
  );
};

interface IExerciseSearchResultsProps {
  form: any;
  setIsOpen: (isOpen: boolean) => void;
  setTerm: (term: string) => void;
}

const ExerciseSearchResults = ({ form, setIsOpen, setTerm }: IExerciseSearchResultsProps) => {
  const [result, setResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const searchParams = useSearchParams();

  const exerciseQuery = searchParams.get("exercise");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        const searchResults = await getExercises({
            searchQuery: exerciseQuery || "",
        });
        setResult(searchResults?.exercises);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResult();
  }, [exerciseQuery]);

  return (
    <div className="background-light800_dark400 absolute top-full z-10 mt-3 w-full rounded-xl">
      <div className="py-6">
        <h4 className="base-bold text-dark400_light800 px-6">Top Match</h4>
        <div className="mt-8 flex w-full flex-col gap-5">
          {result.length ? (
            result.map((item, i) => (
              <SearchResult
                key={i}
                _id={item._id}
                name={item.name}
                gifUrl={item.gifUrl}
                bodyPart={item.bodyPart}
                target={item.target}
                form={form}
                setIsOpen={setIsOpen}
                setTerm={setTerm}
              />
            ))
          ) : isLoading ? (
            <div className="flex-center flex-col">
              <ReloadIcon className="my-2 size-10 animate-spin text-primary-500" />
              <p className="body-regular text-dark200_light800">
                Searching for exercises...
              </p>
            </div>
          ) : (
            <div className="flex-center flex-col">
              <p className="text-5xl">🫣</p>
              <p className="body-regular text-dark200_light800">
                Oops, no results found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseSearchResults;
