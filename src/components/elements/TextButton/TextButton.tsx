import { type FC } from "react";

interface TextButtonProps {
  title: string;
  handleClick: () => void;
  type?: "button" | "submit" | "reset";
}

const TextButton: FC<TextButtonProps> = ({
  title,
  handleClick,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      className="text-sm font-semibold leading-6 text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-800"
    >
      {title}
    </button>
  );
};

export default TextButton;
