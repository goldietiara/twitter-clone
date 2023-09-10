import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const metadata = {
  title: `Onboarding | Twitter by Goldie Tiara"`,
};

export default async function Page() {
  //clerk
  const user = await currentUser();
  if (!user) return null; // to avoid typescript warnings

  //mongodb
  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboard) redirect("/");

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : user.username,
    name: userInfo ? userInfo?.name : user.firstName ?? "",
    bio: userInfo ? userInfo?.bio : "",
    image: userInfo ? userInfo?.image : user.imageUrl,
  };

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <h1 className=" mt-3 text-base-regular text-light-2">
        Complete your tasks now to use Twitter
      </h1>
      <section className="mt-9 bg-dark-2 p-10">
        <AccountProfile user={userData} buttonTitle={"Continue"} />
      </section>
    </main>
  );
}
