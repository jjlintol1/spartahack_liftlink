import Image from "next/image";
import React from "react";
import Link from "next/link";
import { formatTime } from "@/lib/utils";
import Metric from "../shared/Metric";

interface IRoutineCardProps {
  _id: string;
  title: string;
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  targetedMuscleGroups: string[];
  upvotes: number;
  duration: number;
}

const RoutineCard = ({
  _id,
  title,
  author,
  targetedMuscleGroups,
  upvotes,
  duration,
}: IRoutineCardProps) => {
  return (
    <Link
      href={`/routine/${_id}}`}
      scroll={false}
      className="flex min-h-[150px] w-full gap-4 rounded-lg bg-light-800 p-1 shadow-light-100 dark:bg-dark-300 dark:shadow-dark-100"
    >
      <Image
        src="/assets/images/workout.jpg"
        className="rounded-lg max-sm:hidden"
        width={200}
        height={150}
        alt={title}
      />

      <div className="flex w-full flex-col justify-between p-4">
        <div className="flex-col gap-1">
          <div className="flex-between">
            <h3 className="h3-semibold text-dark100_light900 line-clamp-1">
              {title}
            </h3>
            <Image
              src="/assets/icons/save.svg"
              alt="save"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </div>
          <p className="body-regular text-dark200_light800">{author.name}</p>
        </div>
        <div className="max-md:flex-between flex flex-wrap gap-5 max-md:gap-2 xl:gap-8">
          <Metric
            icon="/assets/icons/crosshair.svg"
            metricTitle="target"
            targetedMuscleGroups={targetedMuscleGroups}
          />
          <Metric
            icon="/assets/icons/muscle.svg"
            metricTitle="difficulty"
            otherClasses="max-lg:hidden"
            metricValue="Advanced"
          />
          <Metric
            icon="/assets/icons/clock.svg"
            metricTitle="duration"
            otherClasses="max-md:hidden"
            metricValue={formatTime(duration)}
          />
          <Metric
            icon="/assets/icons/like.svg"
            metricTitle="upvotes"
            metricValue={upvotes}
          />
        </div>
      </div>
    </Link>
  );
};

export default RoutineCard;
