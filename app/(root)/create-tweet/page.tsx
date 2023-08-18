import PostTweet from "@/components/forms/PostTweet";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function CreateTweet() {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo) redirect("/onboarding");

  return (
    <main>
      <h1 className="head-text">Create Tweets</h1>
      <PostTweet userId={userInfo._id} buttonTitle="Post" />
    </main>
  );
}
