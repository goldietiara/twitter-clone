"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type UserCardProps = {
  id: string;
  name: string;
  username: string;
  imgUrl: string;
  personType: string;
};

export default function UserCard({
  id,
  name,
  username,
  imgUrl,
  personType,
}: UserCardProps) {
  const router = useRouter();
  return (
    <button
      className="user-card px-5 py-3 w-full h-full hover:bg-white/5"
      onClick={() => {
        if (personType === "Community") {
          router.push(`/communities/${id}`);
        } else {
          router.push(`/profile/${id}`);
        }
      }}
    >
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Image
            src={imgUrl}
            alt="user_logo"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-start">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>
    </button>
  );
}
