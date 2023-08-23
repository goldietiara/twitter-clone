"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TweetValidation } from "@/lib/validations/tweet";
import { Textarea } from "../ui/textarea";
import { createTweet } from "@/lib/actions/tweet.actions";
import { useOrganization } from "@clerk/nextjs";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";
import Image from "next/image";
import { Input } from "../ui/input";

type PostTweetProps = {
  userId: string;
  buttonTitle: string;
};

export default function PostTweet({ userId, buttonTitle }: PostTweetProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("media");

  const { organization } = useOrganization();

  const form = useForm({
    resolver: zodResolver(TweetValidation),
    defaultValues: {
      tweet: "",
      image: "",
      accountId: userId,
    },
  });

  function handleImage(
    e: React.ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) {
    e.preventDefault();

    const fileReader = new FileReader();

    if (!files) {
      return null;
    } else if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };
      fileReader.readAsDataURL(file);
    }
  }

  async function onSubmit(values: z.infer<typeof TweetValidation>) {
    const blob = values.image;
    if (!blob) return null;
    else {
      const hasImageChanged = isBase64Image(blob);

      // upload image to uploadthing
      if (hasImageChanged) {
        const imageResponse = await startUpload(files);
        if (imageResponse && imageResponse[0].fileUrl) {
          values.image = imageResponse[0].fileUrl;
        }
      }
    }

    await createTweet({
      text: values.tweet,
      author: userId,
      image: values.image,
      communityId: organization ? organization.id : null,
      path: pathname,
    });

    router.push("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" mt-10 flex flex-col justify-start gap-8"
      >
        <FormField
          control={form.control}
          name="tweet"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile_icon"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/assets/profile.svg"
                    alt="profile_icon"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>
              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/**"
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className=" bg-sky-500 hover:bg-gray-700 transition-all ease-in duration-200"
        >
          {buttonTitle}
        </Button>
      </form>
    </Form>
  );
}
