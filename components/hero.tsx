"use client";
import { TypewriterEffect } from "./ui/typewriter-effect";

export default function Hero() {
  const words = [
    {
      text: "Predict",
    },
    {
      text: "Brain Tumor",
    },
    {
      text: "95% ",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "accurately",
    },
    {
      text: "with ",
    },
    {
      text: "the",
    },
    {
      text: "help",
    },
    {
      text: "of",
    },
    {
      text: "MobileNet",
      // className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] leading-
    ">
      
      <TypewriterEffect words={words}
      className="leading-8"
       />
    </div>
  );
}
