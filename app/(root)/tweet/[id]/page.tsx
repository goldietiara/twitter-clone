import TweetCard from "@/components/cards/TweetCard";
import { fetchPosts, fetchTweetById } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

type TweetProps = {
  params: { id: string };
};

export default async function Tweet({ params }: TweetProps) {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboard) redirect("/onboarding");

  const tweet = await fetchTweetById(params.id);

  return (
    <>
      <h1 className="text-heading3-bold text-white">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        <TweetCard
          key={tweet._id}
          id={tweet._id}
          currentUserId={user?.id || ""}
          parentId={tweet.parentId}
          content={tweet.text}
          author={tweet.author}
          community={tweet.community}
          createdAt={tweet.createdAt}
          comments={tweet.children}
        />
      </section>
    </>
  );
}
