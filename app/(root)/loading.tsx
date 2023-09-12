import React from "react";
import { RiLoader4Fill, RiLoader5Fill } from "react-icons/ri";

export default function Loading() {
  return (
    <div className=" grid w-full h-80 place-items-center">
      <div className="relative w-fit h-[36px] animate-spin">
        <RiLoader5Fill className=" shrink-0 text-heading1-bold text-blue" />
        <RiLoader4Fill className=" shrink-0 text-heading1-bold absolute bottom-0 text-blue/30" />
      </div>
    </div>
  );
}
