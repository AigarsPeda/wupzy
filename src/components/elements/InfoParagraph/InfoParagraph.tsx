import type { FC } from "react";
import classNames from "../../../utils/classNames";

interface InfoParagraphProps {
  text: string;
  className?: string;
}

const InfoParagraph: FC<InfoParagraphProps> = ({ text, className }) => {
  return (
    <p
      className={classNames(
        className ? className : "",
        "my-4 text-xs text-gray-400"
      )}
    >
      {text}
    </p>
  );
};

export default InfoParagraph;
