import TweetCard from "@/components/cards/TweetCard";
import PostTweet from "@/components/forms/PostTweet";
import Pagination from "@/components/shared/Pagination";
import { fetchPosts } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();

  const userInfo = await fetchUser(user ? user.id : "");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    5
  );
  return (
    <div>
      <h1 className="text-heading3-bold text-white hidden lg:flex px-10 ">
        Home
      </h1>
      <section
        className={`lg:mt-3 flex flex-col border-b-[1px] border-b-zinc-700 pb-5 ${
          userInfo ? "flex" : "hidden"
        }`}
      >
        <div className="px-5">
          <PostTweet
            userId={userInfo ? userInfo._id : ""}
            buttonTitle="Post"
            image={userInfo ? userInfo.image : ""}
          />
        </div>
      </section>
      <section
        className={` flex flex-col ${userInfo ? "lg:mt-0" : "lg:mt-9 "}`}
      >
        {result.post.length === 0 ? (
          <p className="no-result">No tweets found</p>
        ) : (
          <>
            {result.post.map((v) => (
              <TweetCard
                key={v._id}
                id={v._id}
                currentUserId={user?.id || ""}
                parentId={v.parentId}
                content={v.text}
                image={v.image}
                author={v.author}
                community={v.community}
                createdAt={v.createdAt}
                comments={v.children}
                likes={v.likes}
                userInfoId={userInfo ? userInfo._id : ""}
              />
            ))}
          </>
        )}
      </section>

      <Pagination
        path="/"
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result.isNext}
      />
    </div>
  );
}
