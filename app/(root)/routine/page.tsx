import RoutineCard from "@/components/card/RoutineCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getRoutines } from "@/lib/actions/routine.action";
import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

const Routine = async () => {
  const result = await getRoutines({});

  const { routines } = result;

  return (
    <div className="flex gap-4">
      <div className="flex-1 overflow-y-auto">
        <h1 className="h1-bold text-dark100_light900">Workout Routines</h1>
        <div className="mt-10">
          <LocalSearch route="/routines" placeholder="Search routines" />
        </div>
        <div className="mt-6 flex w-full flex-col gap-6">
          {routines.length > 0 ? (
            [1, 2, 3, 4, 5, 6, 7].map((item) => (
              <RoutineCard
                key={item}
                _id={routines[0]._id}
                title={routines[0].title}
                author={routines[0].author}
                targetedMuscleGroups={routines[0].targetedMuscleGroups}
                upvotes={routines[0].upvotes.length}
                duration={routines[0].duration}
              />
            ))
          ) : (
            <div>No Routines</div>
          )}
        </div>
      </div>
      {/* <div className="custom-scrollbar sticky right-0 top-0 flex h-screen w-[400px] scroll-pt-36 flex-col gap-6 overflow-y-auto pl-10 max-xl:hidden">
        <div className="relative h-[250px] w-full">
          <Image
            src="/assets/images/workout.jpg"
            alt="workout"
            fill
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="h2-semibold text-dark200_light900">Title</h2>
          <div className="background-light900_dark200 flex w-fit items-center gap-2 rounded-full p-2">
            <Image
              src="/assets/icons/user.svg"
              alt="user profile"
              width={30}
              height={30}
              className="rounded-full dark:invert"
            />
            <p className="base-medium text-dark400_light800 mr-5 line-clamp-1">
              Author
            </p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/clock.svg"
              alt="time"
              width={20}
              height={20}
              className="invert-0 dark:invert"
            />
            <p className="paragraph-regular text-dark400_light800">
              1 hr 30 min
            </p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/crosshair.svg"
              alt="target"
              width={20}
              height={20}
              className="invert-0 dark:invert"
            />
            <div className="flex items-center gap-1">
              {[1, 2].map((item) => (
                <Badge
                  variant="outline"
                  key={item}
                  className="body-regular text-dark200_light800"
                >
                  Example
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="h3-semibold text-dark200_light900">Description</h3>
          <p className="body-regular text-dark400_light800 mt-2 line-clamp-3">
            This is a description of a workout plan. This workout plan is going
            to get you JACKED!
            hfdkfjdjfsdlkjfdljlfkdsj;ldfj;lsjdf;lakj;lkjslkdj;flakjsdfldffr
          </p>
        </div>
        <Link href="/routine/1">
          <Button className="btn-primary">View Routine</Button>
        </Link>
      </div> */}
    </div>
  );
};

export default Routine;
