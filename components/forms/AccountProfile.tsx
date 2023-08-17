"use client";

interface AccountProfileProps {
  user: {
    id: string;
    object: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  buttonTitle: string;
}

export default function AccountProfile({
  user,
  buttonTitle,
}: AccountProfileProps) {
  return <div className=" text-light-1">Account Profile</div>;
}
