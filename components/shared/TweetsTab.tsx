import { fetchUserMedia, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import TweetCard from "../cards/TweetCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

type TweetsTabProps = {
  currentUserId: string;
  accountId: string;
  accountType: string;
  userInfoId: string;
};

export default async function TweetsTab({
  currentUserId,
  accountId,
  accountType,
  userInfoId,
}: TweetsTabProps) {
  let result: any;
  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else if (accountType === "User") {
    result = await fetchUserPosts(accountId);
  } else {
    result = await fetchUserMedia(accountId);
  }

  if (!result) redirect("/");

  return (
    <section className=" mt-9 flex flex-col gap-10">
      {result.tweets.map((v: any) => (
        <TweetCard
          key={v._id}
          id={v._id}
          currentUserId={currentUserId}
          parentId={v.parentId}
          content={v.text}
          author={
            accountType === "User" || "Media"
              ? { name: result.name, image: result.image, id: result.id }
              : { name: v.author.name, image: v.author.image, id: v.author.id }
          }
          community={v.community}
          createdAt={v.createdAt}
          comments={v.children}
          image={v.image}
          userInfoId={userInfoId}
          likes={v.likes}
        />
      ))}
    </section>
  );
}
