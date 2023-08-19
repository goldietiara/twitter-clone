"use server";

import { revalidatePath } from "next/cache";
import Tweet from "../models/tweet.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface CreateTweetParams {
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
}: CreateTweetParams) {
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

//page pagination
export async function fetchPosts(pageNumber = 1, pagesize = 20) {
  connectToDB();

  //number of posts to skip
  const skipAmount = (pageNumber - 1) * pagesize;

  const postQuery = Tweet.find({ parentId: { $in: [null, undefined] } })
    .sort({
      createdAt: "desc",
    })
    .skip(skipAmount)
    .limit(pagesize)
    .populate({ path: "author", model: User })
    .populate({
      path: "children",
      populate: {
        path: "author",
        model: User,
        select: "_id name parentId image",
      },
    });

  const totalPostCount = await Tweet.countDocuments({
    parentId: { $in: [null, undefined] },
  });

  const post = await postQuery.exec(); // execute

  const isNext = totalPostCount > skipAmount + post.length;

  return { post, isNext };
}

export async function fetchTweetById(id: string) {
  try {
    connectToDB();

    const tweet = await Tweet.findById(id)
      .populate({
        path: "author",
        model: User,
        select: "_id id name image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Tweet,
            select: "_id id name parentId image",
          },
        ],
      })
      .exec();
    return tweet;
  } catch (error: any) {
    throw new Error(`Failed to fetch comment ${error.message}`);
  }
}

export async function addCommentToTweet(
  tweetId: string,
  commentText: string,
  userId: string,
  path: string
) {
  try {
    connectToDB();

    const originalTweet = await Tweet.findById(tweetId);

    if (!originalTweet) throw new Error(`Tweet not found!`);

    const commentTweet = new Tweet({
      text: commentText,
      author: userId,
      parentId: tweetId,
    });

    const saveCommentTweet = await commentTweet.save();

    originalTweet.children.push(saveCommentTweet._id);

    await originalTweet.save();

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to post comment: ${error.message}`);
  }
}
