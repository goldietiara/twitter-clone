import TweetCard from "@/components/cards/TweetCard";
import { fetchPosts } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboard) redirect("/onboarding");

  const result = await fetchPosts(1, 30);

  // async function Home({
  //   searchParams,
  // }: {
  //   searchParams: { [key: string]: string | undefined };
  // }) {
  //   const user = await currentUser();
  //   if (!user) return null;

  //   const userInfo = await fetchUser(user.id);
  //   if (!userInfo?.onboarded) redirect("/onboarding");

  //   const result = await fetchPosts(
  //     searchParams.page ? +searchParams.page : 1,
  //     30
  //   );

  return (
    <>
      <h1 className="text-heading3-bold text-white">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result.post.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.post.map((v) => (
              <TweetCard
                key={v._id}
                id={v._id}
                currentUserId={user?.id || ""}
                parentId={v.parentId}
                content={v.text}
                author={v.author}
                community={v.community}
                createdAt={v.createdAt}
                comments={v.children}
              />
            ))}
          </>
        )}
      </section>
    </>
  );
}
