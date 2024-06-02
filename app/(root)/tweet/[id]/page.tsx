import TweetCard from "@/components/cards/TweetCard";
import Comment from "@/components/forms/Comment";
import { fetchTweetById } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { Metadata } from "next";
import { cache } from "react";

type TweetProps = {
  params: { id: string };
};

const getTweet = cache(async (id: string) => {
  const result = await fetchTweetById(id);
  if (!result)
    return (
      <p className=" h-screen w-full fles justify-center items-center">
        tweet not found
      </p>
    );
  return result;
});

export async function generateMetadata({
  params: { id },
}: TweetProps): Promise<Metadata> {
  const tweet = await getTweet(id);
  return {
    title: `${tweet.author.name}: ${tweet.text} | Twitter by Goldie Tiara"`,
  };
}

export default async function Tweet({ params }: TweetProps) {
  const user = await currentUser();

  const userInfo = await fetchUser(user ? user.id : "");

  const result = await getTweet(params.id);

  return (
    <section>
      <div className=" flex flex-col">
        <TweetCard
          key={result._id}
          id={result._id}
          currentUserId={user?.id || ""}
          image={result.image}
          parentId={result.parentId}
          content={result.text}
          author={result.author}
          community={result.community}
          createdAt={result.createdAt}
          comments={result.children}
          likes={result.likes}
          userInfoId={userInfo ? userInfo._id : ""}
        />
      </div>
      <div className={userInfo ? "flex w-full" : "hidden"}>
        <Comment
          tweetId={params.id}
          currentUserImg={userInfo ? userInfo.image : ""}
          currentUserId={JSON.stringify(userInfo ? userInfo._id : "")}
          buttonTitle="Reply"
        />
      </div>
      <div className="mt-10">
        {result.children.map((v: any) => (
          <TweetCard
            key={v._id}
            id={v._id}
            currentUserId={user?.id || ""}
            parentId={v.parentId}
            image={v.image}
            content={v.text}
            author={v.author}
            community={v.community}
            createdAt={v.createdAt}
            comments={v.children}
            likes={v.likes}
            userInfoId={userInfo ? userInfo._id : ""}
            isComment={true}
          />
        ))}
      </div>
    </section>
  );
}
