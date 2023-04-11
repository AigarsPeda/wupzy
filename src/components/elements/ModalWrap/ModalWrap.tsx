import useDelayUnmount from "hooks/useDelayUnmount";
import useOnClickOutside from "hooks/useOnClickOutside";
import type { FC, ReactNode } from "react";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import classNames from "utils/classNames";

interface ModalWrapProps {
  modalWidth?:
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "large"
    | "medium";

  modalTitle: string;
  header?: JSX.Element;
  modalsWidth?: string;
  isFullScreen?: boolean;
  titleClassName?: string;
  isModalVisible: boolean;
  topPosition?: "default" | "top";
  children: JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
  handleCancelClick: () => void;
}

const ModalWrap: FC<ModalWrapProps> = ({
  children,
  modalTitle,
  modalsWidth,
  isFullScreen,
  titleClassName,
  isModalVisible,
  handleCancelClick,
  modalWidth = "medium",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { shouldRender, isAnimation } = useDelayUnmount(isModalVisible, 100);
  useOnClickOutside<HTMLDivElement>(modalRef, () => {
    handleCancelClick();
  });

  return (
    <>
      {shouldRender && (
        <div
          className={classNames(
            isAnimation ? "opacity-100" : "opacity-0",
            "fixed left-0 top-0 z-[69] flex h-full w-full items-center justify-center transition-all duration-300 ease-in-out"
          )}
        >
          <div className="absolute h-full w-full bg-gray-900 opacity-50"></div>
          <div
            ref={modalRef}
            className={classNames(
              modalWidth === "xl" && "md:max-w-xl",
              modalWidth === "2xl" && "md:max-w-2xl",
              modalWidth === "3xl" && "md:max-w-3xl",
              modalWidth === "4xl" && "md:max-w-4xl",
              modalWidth === "5xl" && "md:max-w-5xl",
              modalWidth === "6xl" && "md:max-w-6xl",
              modalWidth === "7xl" && "md:max-w-7xl",
              modalWidth === "large" && "md:max-w-lg",
              modalWidth === "medium" && "md:max-w-md",
              isFullScreen && "h-full w-full",
              modalsWidth && modalsWidth,
              "absolute z-[69] mx-2 h-[90%] w-[90%] rounded bg-white shadow-lg sm:mx-5"
            )}
          >
            <div
              className={classNames(
                "h-full w-full px-3 py-2 text-left md:px-6 md:py-4"
              )}
            >
              {/* <!--Title--> */}
              <div
                className={classNames(
                  titleClassName ? titleClassName : "",
                  "relative flex items-center justify-between pb-2"
                )}
              >
                <div className="flex">
                  <p className="font-secondary text-2xl font-bold">
                    {modalTitle}
                  </p>
                </div>
                <button className="cursor-pointer" onClick={handleCancelClick}>
                  <IoClose className="absolute -right-2 top-0 h-8 w-9 text-gray-800 hover:text-gray-500" />
                </button>
              </div>

              {/* <!--Body--> */}
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalWrap;
