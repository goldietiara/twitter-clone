import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/SearchBar";
import { Metadata } from "next";

export function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}): Metadata {
  return {
    title: `${
      searchParams.q ? `Search for ${searchParams.q}` : "Connect"
    } | Twitter by Goldie Tiara`,
  };
}

export default async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboard) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    pageNumber: searchParams?.page ? +searchParams.page : 1,
    pageSize: 25,
  });

  return (
    <section className="mx-5 relative">
      <div
        className=" pb-1 bg-dark-1 z-20
      sticky top-16
      lg:top-10"
      >
        <h1
          className="head-text 
        pb-5 hidden
        md:pb-10 lg:flex"
        >
          Search
        </h1>

        <div className="pt-3">
          <Searchbar routeType="search" />
        </div>
      </div>
      <div className="flex flex-col">
        {result.users.length === 0 ? (
          <p className="no-result">No Result</p>
        ) : (
          <>
            {result.users.map((v) => (
              <UserCard
                key={v.id}
                id={v.id}
                name={v.name}
                username={v.username}
                imgUrl={v.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
}
