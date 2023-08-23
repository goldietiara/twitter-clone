import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import TweetCard from "../cards/TweetCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchTweetById } from "@/lib/actions/tweet.actions";
import { fetchLikedPosts } from "@/lib/actions/like.actions";

type TweetsTabProps = {
  accountId: string;
  userInfoId: string;
};

export default async function LikesTab({
  accountId,
  userInfoId,
}: TweetsTabProps) {
  const result = await fetchLikedPosts(accountId);

  if (!result) redirect("/");

  return (
    <section className=" mt-9 flex flex-col gap-10">
      {result.map((v: any) => (
        <TweetCard
          key={v._id}
          id={v._id}
          currentUserId={v.author.id}
          parentId={v.parentId}
          content={v.text}
          author={{
            name: v.author.name,
            image: v.author.image,
            id: v.author.id,
          }}
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
