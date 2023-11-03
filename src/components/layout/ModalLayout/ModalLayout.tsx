import type { FC, ReactNode } from "react";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import useDelayUnmount from "~/hooks/useDelayUnmount";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import classNames from "~/utils/classNames";

interface ModalLayoutProps {
  isDots?: boolean;
  footer?: ReactNode;
  header?: ReactNode;
  isMargin?: boolean;
  children: ReactNode;
  isPadding?: boolean;
  isFullScreen?: boolean;
  isModalVisible: boolean;
  bgColor?: "white" | "gray";
  handleCancelClick: () => void;
}

const ModalLayout: FC<ModalLayoutProps> = ({
  header,
  footer,
  isDots,
  children,
  isMargin,
  isFullScreen,
  isModalVisible,
  handleCancelClick,
  bgColor = "white",
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
          id="menu"
          className={classNames(
            isAnimation ? "opacity-100" : "opacity-0",
            "sticky-0 fixed inset-0 z-[900] flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-80 transition-all duration-300 ease-in-out"
          )}
        >
          <div className="relative h-full w-full">
            <div
              className={classNames(
                !isFullScreen && "p-3 md:p-10",
                "absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform"
              )}
            >
              <div
                ref={modalRef}
                className={classNames(
                  bgColor === "white" && "bg-white",
                  bgColor === "gray" && "bg-gray-100",
                  "flex h-full w-full flex-col justify-between rounded"
                )}
              >
                <div className="flex items-center justify-between px-3 py-2 pb-2 text-left md:px-6 md:py-4">
                  {header && <div className="truncate">{header}</div>}
                  <div>
                    <button
                      className="cursor-pointer"
                      onClick={handleCancelClick}
                    >
                      <IoClose className="right-2 top-2 h-8 w-9 text-gray-800 hover:text-gray-500" />
                    </button>
                  </div>
                </div>
                <div
                  className={classNames(
                    isDots && "dots",
                    isMargin && "m-4",
                    "h-full overflow-x-auto overflow-y-auto"
                  )}
                >
                  {children}
                </div>
                {footer && <div>{footer}</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalLayout;
