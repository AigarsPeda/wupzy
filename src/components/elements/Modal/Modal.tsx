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
  titleClassName?: string;
  isModalVisible: boolean;
  maxHeight?: "none" | "md";
  topPosition?: "default" | "top";
  children: JSX.Element | JSX.Element[] | ReactNode | ReactNode[];
  handleCancelClick: () => void;
}

const ModalWrap: FC<ModalWrapProps> = ({
  children,
  modalTitle,
  titleClassName,
  isModalVisible,
  handleCancelClick,
  maxHeight = "none",
  modalWidth = "medium",
  topPosition = "default",
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
            "fixed top-0 left-0 z-[69] flex h-full w-full items-center justify-center transition-all duration-300 ease-in-out"
          )}
        >
          <div className="modal-overlay absolute h-full w-full bg-gray-900 opacity-50"></div>
          <div
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
              topPosition === "top" && "top-[2%] md:top-[5%]",
              topPosition === "default" && "top-[2%] md:top-[15%]",
              "modal-container absolute z-[69] mx-auto h-[95%] w-11/12 overflow-y-auto rounded bg-white shadow-lg sm:h-auto"
            )}
            ref={modalRef}
          >
            <div
              className={classNames(
                maxHeight === "md" ? "max-h-[50rem]" : "",
                "w-full px-6 py-4 text-left"
              )}
            >
              {/* <!--Title--> */}
              <div
                className={classNames(
                  titleClassName ? titleClassName : "",
                  "relative flex items-center justify-between pb-2"
                )}
              >
                <p className="font-secondary text-2xl font-bold">
                  {modalTitle}
                </p>
                <button className="cursor-pointer" onClick={handleCancelClick}>
                  <IoClose className="absolute top-0 -right-2 h-8 w-9 text-gray-800 hover:text-gray-500" />
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
