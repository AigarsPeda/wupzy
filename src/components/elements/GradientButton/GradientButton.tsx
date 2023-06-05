import { type FC } from "react";

interface GradientButtonProps {
  btnTitle: string;
  handleClick: () => void;
  btnType?: "button" | "submit" | "reset";
}

const GradientButton: FC<GradientButtonProps> = ({
  btnTitle,
  handleClick,
  btnType = "button",
}) => {
  return (
    <button
      type={btnType}
      onClick={handleClick}
      className="group relative inline-flex items-center justify-center overflow-hidden rounded-md p-0.5 font-bold"
    >
      <span className="absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]"></span>
      <span className="duration-400 relative flex h-11 items-center justify-center rounded bg-gray-900 px-6 transition-all ease-out group-hover:bg-opacity-0">
        <span className="relative text-white">{btnTitle}</span>
      </span>
    </button>
  );
};

export default GradientButton;
