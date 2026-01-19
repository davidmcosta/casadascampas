import React from "react";

interface StyledTitleProps {
  text: string;
}

const StyledTitle: React.FC<StyledTitleProps> = ({ text }) => {
  if (!text) return null;

  const words = text.trim().split(" ");
  if (words.length === 1) {
    return (
      <h1 className="text-4xl font-bold text-black">
        {words[0]}
      </h1>
    );
  }

  const lastWord = words.pop()!;
  const firstWords = words.join(" ");

  return (
    <h1 className="text-2xl font-bold text-blackDark mb-4 text-center">
      <span className="text-black">{firstWords} </span>
      <span className="text-amberVar">{lastWord}</span>
    </h1>
  );
};

export default StyledTitle;
