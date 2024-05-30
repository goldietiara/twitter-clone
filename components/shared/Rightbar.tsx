import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import UserCard from "../cards/UserCard";
import Link from "next/link";

export default async function Rightbar() {
  const user = await currentUser();

  const similarMinds = await fetchUsers({
    userId: user ? user.id : "user_2UFa1k49bJJ08X08Zxof7Ydl0R2",
    pageSize: 4,
  });
  const suggestedCOmmunities = await fetchCommunities({ pageSize: 4 });

  return (
    <section className=" custom-scrollbar rightsidebar text-light-1">
      <div className=" flex flex-1 flex-col justify-start bg-dark-4 rounded-xl">
        <h3 className=" indent-5 text-heading4-medium py-5">
          Suggested Communities
        </h3>
        <div className=" flex w-[350px] flex-col">
          {suggestedCOmmunities.communities.length > 0 ? (
            <>
              {suggestedCOmmunities.communities.slice(0, 3).map((community) => (
                <UserCard
                  key={community.id}
                  id={community.id}
                  name={community.name}
                  username={community.username}
                  imgUrl={community.image}
                  personType="Community"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">
              No communities yet
            </p>
          )}
        </div>
        <Link
          href={"/communities"}
          className=" text-blue cursor-pointer indent-5 py-4 text-[15px] hover:bg-white/5"
        >
          Show More
        </Link>
      </div>

      <div className=" flex flex-1 flex-col bg-dark-4 rounded-xl">
        <h3 className=" indent-5 text-heading4-medium py-5">Who to follow</h3>
        <div className=" flex w-[350px] flex-col items-start">
          {similarMinds.users.length > 0 ? (
            <>
              {similarMinds.users.slice(0, 3).map((person) => (
                <UserCard
                  key={person.id}
                  id={person.id}
                  name={person.name}
                  username={person.username}
                  imgUrl={person.image}
                  personType="User"
                />
              ))}
            </>
          ) : (
            <p className="!text-base-regular text-light-3">No users yet</p>
          )}
        </div>
        <Link
          href={"/search"}
          className=" text-blue cursor-pointer indent-5 py-4 text-[15px] hover:bg-white/5"
        >
          Show More
        </Link>
      </div>
    </section>
  );
}
