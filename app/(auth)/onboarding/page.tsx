import AccountProfile from "@/components/forms/AccountProfile";
import { currentUser } from "@clerk/nextjs";

export default async function Page() {
  //clerk
  const user = await currentUser();
  //get user data from clerk
  const userInfo = {};
  //mongoose
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <h1 className=" mt-3 text-base-regular text-light-2">
        Complete your tasks now to use Twitter
      </h1>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile />
      </section>
    </main>
  );
}
