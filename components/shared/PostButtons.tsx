"use client";
import { createLike } from "@/lib/actions/like.actions";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { RiLoader4Fill, RiLoader5Fill } from "react-icons/ri";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { redirect } from "next/navigation";

type PostButtonsProps = {
  userInfoId: string;
  post: string;
  likes: string[];
};
export default function LikeButtons({
  userInfoId,
  post,
  likes,
}: PostButtonsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, setPending] = useState<boolean>(false);

  async function addLike() {
    if (userInfoId === "") router.push("/onboarding");

    setPending(true);
    await createLike({
      userInfoId: userInfoId,
      post: post,
      path: pathname,
    });
    setPending(false);
    router.refresh();
  }
  return (
    <div
      className="flex gap-1 cursor-pointer items-center group"
      onClick={() => addLike()}
    >
      {pending ? (
        <div className="relative w-fit h-[18px] animate-spin">
          <RiLoader5Fill className=" shrink-0 text-body-bold text-pink-700" />
          <RiLoader4Fill className=" shrink-0 text-body-bold absolute bottom-0 text-pink-700/30" />
        </div>
      ) : likes.includes(userInfoId) ? (
        <TbHeartFilled className={` text-pink-700`} />
      ) : (
        <TbHeart className={` group-hover:text-pink-700 text-gray-400`} />
      )}
      <span
        className={
          likes.includes(userInfoId)
            ? ` text-small-regular text-pink-700`
            : ` text-small-regular text-gray-400 group-hover:text-pink-700`
        }
      >
        {likes.length > 0 ? likes.length : ""}
      </span>
    </div>
  );
}
