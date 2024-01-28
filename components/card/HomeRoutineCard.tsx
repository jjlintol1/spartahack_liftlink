import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IHomeRoutineCardProps {
  id: number;
  user: {
    profile: string;
    name: string;
  };
  name: string;
  duration: string;
  upvotes: number;
  imgUrl: string;
}

const HomeRoutineCard = ({
  id,
  user,
  name,
  duration,
  upvotes,
  imgUrl,
}: IHomeRoutineCardProps) => {
  return (
    <Link href={`routine/${id}`} className="card-wrapper relative rounded-xl p-2">
      {/* Image */}
      <Image
        src={imgUrl}
        alt={name}
        width={210}
        height={120}
        className="max-h-[120px] min-w-[210px] rounded-xl"
      />

      {/* Overlay */}
      <div className="background-light900_dark200 absolute left-5 top-[105px] w-[175px] rounded-full">
        <div className="flex items-center gap-2 p-2">
          <Image
            src={user.profile}
            alt={user.name}
            width={24}
            height={24}
            className="invert-colors rounded-full"
          />
          <p className="body-regular text-dark200_light800 line-clamp-1 font-poppins">
            {user.name}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="paragraph-regular text-dark200_light800 font-poppins">{name}</p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Image
              src="/assets/icons/clock.svg"
              alt="duration"
              width={18}
              height={18}
              className="invert-colors"
            />
            <p className="text-dark300_light700 body-regular">{duration}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image
              src="/assets/icons/like.svg"
              alt="duration"
              width={18}
              height={18}
              className="invert-colors"
            />
            <p className="text-dark300_light700 body-regular">{upvotes} votes</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HomeRoutineCard;
