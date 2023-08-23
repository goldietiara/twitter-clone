import Image from "next/image";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { profileTabs } from "@/constants";
import ProfileHeader from "@/components/shared/ProfileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchUser } from "@/lib/actions/user.actions";
import TweetsTab from "@/components/shared/TweetsTab";
import { getUserLikes } from "@/lib/actions/like.actions";
import LikesTab from "@/components/shared/LikesTab";

type UserProfileParams = {
  params: { id: string };
};

export default async function UserProfile({ params }: UserProfileParams) {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);
  if (!userInfo?.onboard) redirect("/onboarding");

  const LikePosts = await getUserLikes(userInfo._id);

  return (
    <section>
      <ProfileHeader
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio}
      />
      <div className="mt-7">
        <Tabs defaultValue="tweets" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger key={tab.label} value={tab.value} className="tab">
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>

                {tab.label === "Tweets" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.tweets.length}
                  </p>
                )}
                {tab.label === "Likes" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.likes.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="tweets" className="w-full text-light-1">
            <TweetsTab
              currentUserId={user.id}
              accountId={userInfo.id}
              userInfoId={userInfo._id}
              accountType="User"
            />
          </TabsContent>
          <TabsContent value="likes" className="w-full text-light-1">
            <LikesTab userInfoId={LikePosts._id} accountId={LikePosts.likes} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
