"use client";

import { usePathname, useRouter } from "next/navigation";
import { deleteTweet } from "@/lib/actions/tweet.actions";
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { RiLoader4Fill, RiLoader5Fill } from "react-icons/ri";

interface Props {
  tweetId: string;
  currentUserId: string;
  authorId: string;
  parentId: string | null;
  isComment?: boolean;
}

export default function DeleteTweet({
  tweetId,
  currentUserId,
  authorId,
  parentId,
  isComment,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, setPending] = useState<boolean>(false);

  if (currentUserId !== authorId || pathname === "/") return null;

  return (
    <button
      className="cursor-pointer object-contain"
      onClick={async () => {
        setPending(true);
        await deleteTweet(JSON.parse(tweetId), pathname);
        if (!parentId || !isComment) {
          router.push("/");
          setPending(false);
        }
      }}
    >
      {pending ? (
        <div className="relative w-fit h-[18px] animate-spin">
          <RiLoader5Fill className=" shrink-0 text-body-bold text-red-500" />
          <RiLoader4Fill className=" shrink-0 text-body-bold absolute bottom-0 text-red-700/30 text-red-500" />
        </div>
      ) : (
        <MdDelete className=" shrink-0 text-red-500" />
      )}
    </button>
  );
}
