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
      text: "97% ",
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
      text: "CNN",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
        CNN's Brain Tumor Prediction
      </p>
      <TypewriterEffect words={words} />
    </div>
  );
}
