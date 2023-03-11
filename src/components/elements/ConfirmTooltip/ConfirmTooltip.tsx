import useDelayUnmount from "hooks/useDelayUnmount";
import useOnClickOutside from "hooks/useOnClickOutside";
import type { FC } from "react";
import { useRef } from "react";
import classNames from "utils/classNames";

interface ConfirmTooltipProps {
  position?: string;
  isTooltip: boolean;
  cancelTitle: string;
  confirmTitle: string;
  tailPosition?: "top" | "right";
  handleCancel: () => void;
  handleConfirm: () => void;
}

const ConfirmTooltip: FC<ConfirmTooltipProps> = ({
  position,
  isTooltip,
  cancelTitle,
  confirmTitle,
  handleCancel,
  handleConfirm,
  tailPosition = "top",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { shouldRender, isAnimation } = useDelayUnmount(isTooltip, 100);
  useOnClickOutside<HTMLDivElement>(modalRef, () => {
    handleCancel();
  });

  return (
    <>
      {shouldRender && (
        <div
          ref={modalRef}
          className={classNames(
            isAnimation ? "opacity-100" : "opacity-0",
            "absolute z-10 flex items-center rounded-md bg-gray-300 px-5 py-3 shadow-md transition-all duration-300 ease-in-out",
            position ? position : "top-10 right-1"
          )}
        >
          <button
            onClick={handleConfirm}
            className="mr-4 rounded-md bg-red-500 px-4 py-2 text-xs text-white"
          >
            {confirmTitle}
          </button>
          <button
            onClick={handleCancel}
            className="rounded-md bg-gray-800 px-4 py-2 text-xs text-white"
          >
            {cancelTitle}
          </button>
          <div
            className={classNames(
              tailPosition === "top" && " -top-2 right-3",
              tailPosition === "right" && " -right-2 top-3",
              "pointer-events-none absolute -z-[1] h-5 w-5 rotate-45 bg-gray-300"
            )}
          />
        </div>
      )}
    </>
  );
};

export default ConfirmTooltip;
