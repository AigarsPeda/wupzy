import type { FC } from "react";

interface InfoParagraphProps {
  text: string;
}

const InfoParagraph: FC<InfoParagraphProps> = ({ text }) => {
  return <p className="my-4 text-xs text-gray-400">{text}</p>;
};

export default InfoParagraph;
