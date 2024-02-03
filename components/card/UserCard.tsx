import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IUserCardProps {
  clerkId: string;
  name: string;
  username: string;
  picture: string;
  followers: number;
  following: number;
}

const UserCard = ({
  clerkId,
  name,
  username,
  picture,
  followers,
  following,
}: IUserCardProps) => {
  return (
    <Link
      href={`/profile/${clerkId}`}
      className="card-wrapper flex-center max-w-[260px] flex-col gap-5 rounded-xl p-7"
    >
      <Image
        src={picture}
        alt={name}
        width={100}
        height={100}
        className="max-h-[100px] min-h-[100px] min-w-[100px] max-w-[100px] rounded-full"
      />
      <div className="flex flex-col items-center gap-2">
        <h3 className="h3-bold text-dark100_light900">{name}</h3>
        <p className="body-regular text-light-500">@{username}</p>
      </div>
      <div className="flex-center gap-4">
        <div className="flex items-center gap-1">
          <p className="paragraph-semibold text-dark100_light900">
            {followers}
          </p>
          <p className="body-regular text-light-500">Followers</p>
        </div>
        <div className="flex items-center gap-1">
          <p className="paragraph-semibold text-dark100_light900">
            {following}
          </p>
          <p className="body-regular text-light-500">Following</p>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
