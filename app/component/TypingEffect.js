"use client";
import { useEffect, useState } from "react";

const TypingEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length < text.length) {
          return text.slice(0, prev.length + 1);
        } else {
          clearInterval(timer);
          return prev; // Stop updating once the full text is shown
        }
      });
    }, speed);

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, [text, speed]);

  return (
    <h1 className="text-4xl font-bold text-center my-8 text-borderColor font-serif">
      {displayedText}
    </h1>
  );
};

export default TypingEffect;
