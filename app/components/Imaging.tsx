"use client";

import Image from "next/image";
import { useState } from "react";

const issImages = [
  "/141007-international-space-station-jms-1708.jpg",
  "/International-Space-Station-in-2021-scaled.webp"
];

function getRandomIssImage() {
  const randomIndex = Math.floor(Math.random() * issImages.length);

  return issImages[randomIndex];
}

export default function Imaging() {
  const [randomImage] = useState(getRandomIssImage);

  return (
    <div className="fixed inset-0 z-0">
      <Image
        src={randomImage}
        alt="International Space Station background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}
