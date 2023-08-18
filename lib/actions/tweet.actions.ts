"use server";

import { revalidatePath } from "next/cache";
import Tweet from "../models/tweet.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface CreateTweetProps {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createTweet({
  text,
  author,
  communityId,
  path,
}: CreateTweetProps) {
  try {
    connectToDB();

    //create tweet
    const createdTweet = await Tweet.create({
      text,
      author,
      community: null,
    });

    //update user model
    await User.findByIdAndUpdate(author, {
      $push: { tweets: createdTweet._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to post Tweet: ${error.message}`);
  }
}
