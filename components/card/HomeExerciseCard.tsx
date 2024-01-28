import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IHomeExerciseCardProps {
  id: string;
  bodyPart: string;
  name: string;
  gifUrl: string;
  target: string;
}

const HomeExerciseCard = ({
  id,
  bodyPart,
  name,
  gifUrl,
  target
}: IHomeExerciseCardProps) => {
  return (
    <Link href={`/exercise/${id}`} className="card-wrapper rounded-xl p-4">
      <Image
        src={gifUrl}
        alt={name}
        height={200}
        width={250}
        className="min-h-[200px] min-w-[250px] rounded-xl bg-transparent"
      />
      <div className="mt-4">
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
    </Link>
  );
};

export default HomeExerciseCard;
