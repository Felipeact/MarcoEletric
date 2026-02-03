"use client"; // make sure this is a Client Component if using Next.js

import React from "react";

const data = [
  { id: 1, src: "/showcase/showcase1.JPG", alt: "Image 1" },
  { id: 2, src: "/showcase/showcase2.JPG", alt: "Image 2" },
  { id: 3, src: "/showcase/showcase3.JPG", alt: "Image 3" },
  { id: 4, src: "/showcase/showcase4.JPG", alt: "Image 4" },
  { id: 5, src: "/showcase/showcase5.JPG", alt: "Image 5" },
  { id: 6, src: "/showcase/showcase6.JPG", alt: "Image 6" },
  { id: 7, src: "/showcase/showcase7.JPG", alt: "Image 7" },
  { id: 8, src: "/showcase/showcase8.JPG", alt: "Image 8" },
  { id: 9, src: "/showcase/showcase9.JPG", alt: "Image 9" },
  { id: 10, src: "/showcase/showcase10.JPG", alt: "Image 10" },
  { id: 11, src: "/showcase/showcase11.JPG", alt: "Image 11" },
];

// Fisher–Yates shuffle
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function ShowCase() {
  const [shuffledImages, setShuffledImages] = React.useState(data);

  React.useEffect(() => {
    // Shuffle only on the client
    setShuffledImages(shuffleArray(data));
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {shuffledImages.map((item) => (
          <div key={item.id}>
            <img
              className="h-auto max-w-full rounded-base"
              src={item.src}
              alt={item.alt}
            />
          </div>
        ))}
      </div>
    </>
    );
}
