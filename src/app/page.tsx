"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface TypingAnimationProps {
  text: string;
  speed: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, speed }) => {
  const [animatedText, setAnimatedText] = useState<string>("");

  useEffect(() => {
    let animationTimeout: NodeJS.Timeout;

    const animateText = (currentIndex: number) => {
      const nextChar = text[currentIndex];
      setAnimatedText((prevText) => prevText + nextChar);

      if (currentIndex < text.length - 1) {
        animationTimeout = setTimeout(
          () => animateText(currentIndex + 1),
          speed
        );
      }
    };

    animateText(0);

    return () => {
      clearTimeout(animationTimeout);
    };
  }, [text, speed]);

  return <p className="italic m-2 text-md">{animatedText}</p>;
};

export default function Home() {
  return (
    <main className="w-full h-screen bg-gray-200">
      <div className="flex flex-col items-center justify-cente">
        <p className="text-5xl font-bold mt-5 text-[#388080]">Storeit</p>
        <TypingAnimation
          text="Empower Your File Management: Upload and Discover with Ease"
          speed={75}
        />
        <Image
          className="rounded-lg pt-5"
          src="/storeitimage.jpeg"
          width={450}
          height={450}
          alt="Picture of Storeit"
        />
      </div>
    </main>
  );
}
