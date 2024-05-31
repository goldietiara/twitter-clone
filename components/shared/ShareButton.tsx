"use client";
import { useState } from "react";
import { TbShare2 } from "react-icons/tb";

type ShareButtonProps = {
  tweetId: string;
};

export default function ShareButton({ tweetId }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  function copyLinkToClipboard() {
    // Create a temporary input element to hold the link
    const tempInput = document.createElement("input");
    tempInput.value = `https://twitter-clone-pcto-goldietiaraidgmailcoms-projects.vercel.app/tweet/${tweetId}`;
    document.body.appendChild(tempInput);

    // Select the input field and copy the link
    tempInput.select();
    document.execCommand("copy");

    // Clean up by removing the temporary input element
    document.body.removeChild(tempInput);

    // Set copied state to true and display a message
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  }

  return (
    <button onClick={copyLinkToClipboard}>
      <TbShare2 className=" hover:text-emerald-400 transition-all ease-out duration-200 cursor-pointer" />
    </button>
  );
}
