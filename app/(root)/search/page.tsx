import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";

export default async function Search() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo.onboard) redirect("/onboarding");

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      {/* <Searchbar routeType='search' /> */}

      <div className="mt-14 flex flex-col gap-9">
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
