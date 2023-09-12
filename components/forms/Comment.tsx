"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { CommentValidation } from "@/lib/validations/tweet";
import * as z from "zod";
import { Input } from "../ui/input";
import Image from "next/image";
import { addCommentToTweet } from "@/lib/actions/tweet.actions";
import { useState } from "react";
import { RiLoader4Fill, RiLoader5Fill } from "react-icons/ri";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { PiXLight } from "react-icons/pi";
import { TbPhoto } from "react-icons/tb";

type CommentProps = {
  tweetId: string;
  currentUserImg: string;
  currentUserId: string;
  buttonTitle: string;
};

export default function Comment({
  tweetId,
  currentUserImg,
  currentUserId,
  buttonTitle,
}: CommentProps) {
  const pathname = usePathname();
  const [pending, setPending] = useState<boolean>(false);
  const { startUpload } = useUploadThing("media");
  const [files, setFiles] = useState<File[] | null>([]);

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      tweet: "",
      image: null,
    },
  });

  function handleImage(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string | null) => void
  ) {
    e.preventDefault();
    if (e.target.files?.length == 0) {
      console.log("no image");
      fieldChange(null);

      return;
    } else if (e.target.files && e.target.files.length > 0) {
      console.log("start inserting image");
      const fileReader = new FileReader();
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      console.log(files);

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      console.log("image inserted");
      fileReader.readAsDataURL(file);
    }
  }

  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    setPending(true);

    if (!values.image) {
      // No image provided, proceed without uploading an image
      await addCommentToTweet(
        tweetId,
        values.tweet,
        JSON.parse(currentUserId),
        pathname,
        values.image ? values.image : null
      );
    } else if (isBase64Image(values.image)) {
      // Image is base64-encoded, proceed with image upload logic
      const imageResponse = await startUpload(files!);
      if (imageResponse && imageResponse[0].fileUrl) {
        values.image = imageResponse[0].fileUrl;
      }
      await addCommentToTweet(
        tweetId,
        values.tweet,
        JSON.parse(currentUserId),
        pathname,
        values?.image
      );
    }

    form.reset();
    setPending(false);
  }

  return (
    <Form {...form}>
      <form
        className="comment-form px-3 md:px-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="tweet"
          render={({ field }) => (
            <FormItem className="flex w-full items-center gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="current_user"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  {...field}
                  placeholder="Post your reply!"
                  className="no-focus text-light-1 outline-none"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full flex-col justify-end gap-2">
              <FormLabel className="w-full">
                <div className=" flex w-full justify-end items-center gap-5 ">
                  <TbPhoto className="shrink-0 cursor-pointer text-blue text-heading3-bold" />
                  <Button
                    type="submit"
                    className=" bg-blue hover:bg-gray-700 transition-all ease-in duration-200 w-[80px] rounded-full"
                  >
                    {pending ? (
                      <div className="relative w-fit h-[24px] animate-spin">
                        <RiLoader5Fill className=" shrink-0 text-heading3-bold " />
                        <RiLoader4Fill className=" shrink-0 text-heading3-bold absolute bottom-0 text-white/30" />
                      </div>
                    ) : (
                      buttonTitle
                    )}
                  </Button>
                </div>
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/**"
                  placeholder="Upload a photo"
                  className="hidden"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleImage(e, field.onChange)
                  }
                />
              </FormControl>
              <FormMessage />
              {field.value ? (
                <div className="w-full h-fit relative flex-col items-center gap-5 ">
                  <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="w-full rounded-2xl"
                  />
                  <button
                    className=" absolute top-1 right-1 bg-black/50 p-2 rounded-full "
                    onClick={(e) => {
                      e.preventDefault();
                      form.resetField("image");
                    }}
                  >
                    <PiXLight className=" shrink-0 text-white " />
                  </button>
                </div>
              ) : (
                ""
              )}
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
