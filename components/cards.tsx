"use client";

import Particles from "@/components/ui/particles";
import Image from "next/image";
import { useState } from "react";

export default function Card({
  label,
  description,
  image,
}: {
  label: string;
  description: string;
  image: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex h-full p-6 w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl ${
        isHovered ? "opacity-100" : "opacity-50"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <div className="z-10 flex flex-col items-center">
        <Image
          src={image}
          alt="brain"
          width={300}
          height={300}
          className={`object-cover object-center w-48 h-48 rounded-full border-4 grayscale border-gray-200 dark:border-gray-600 shadow-lg transform transition-transform duration-300 
            ${isHovered && "scale-105"}`}
        />
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold dark:text-gray-700 text-gray-100 transition-colors duration-300 text-start">
            {label}
          </h1>
          <p className="mt-2 text-lg dark:text-gray-600 text-gray-400 transition-colors duration-300 text-start">
            {description}
          </p>
        </div>
        <button className="p-2 text-start rounded-md mt-4 text-white bg-black border border-white ml-auto">
          Get more info
        </button>
      </div>

      {isHovered && (
        <Particles
          className="absolute inset-0"
          quantity={100}
          ease={80}
          color={"#fff"}
          refresh
        />
      )}
    </div>
  );
}
