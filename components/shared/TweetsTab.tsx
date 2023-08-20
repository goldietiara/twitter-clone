import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import TweetCard from "../cards/TweetCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

type TweetsTabProps = {
  currentUserId: string;
  accountId: string;
  accountType: string;
};

export default async function TweetsTab({
  currentUserId,
  accountId,
  accountType,
}: TweetsTabProps) {
  let result: any;
  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
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
            accountType === "User"
              ? { name: result.name, image: result.image, id: result.id }
              : { name: v.author.name, image: v.author.image, id: v.author.id }
          }
          community={v.community}
          createdAt={v.createdAt}
          comments={v.children}
        />
      ))}
    </section>
  );
}
