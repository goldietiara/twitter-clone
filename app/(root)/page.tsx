import TweetCard from "@/components/cards/TweetCard";
import Pagination from "@/components/shared/Pagination";
import { fetchPosts } from "@/lib/actions/tweet.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user)
    return (
      <span className="flex flex-col gap-3 justify-center mt-24 items-center m-auto text-[45px] text-white">
        <Image src="/logo.png" width={200} height={200} alt="logo" />
        <p>
          Hi, Please{" "}
          <Link href={"/sign-in"} className=" underline hover:text-blue">
            login
          </Link>{" "}
          first
        </p>
      </span>
    );

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboard) redirect("/onboarding");

  const result = await fetchPosts(
    searchParams.page ? +searchParams.page : 1,
    5
  );
  return (
    <div>
      <h1 className="text-heading3-bold text-white hidden lg:flex px-10 ">
        Home
      </h1>
      <section className="lg:mt-9  flex flex-col">
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
                userInfoId={userInfo._id}
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
