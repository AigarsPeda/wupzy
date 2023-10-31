import { useRef, type FC, type ReactNode } from "react";
import { IoClose } from "react-icons/io5";
import useDelayUnmount from "~/hooks/useDelayUnmount";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import classNames from "~/utils/classNames";

interface SmallModalLayoutProps {
  footer?: ReactNode;
  modalTitle?: string;
  children: ReactNode;
  isFullScreen?: boolean;
  isModalVisible: boolean;
  bgColor?: "white" | "dark";
  handleCancelClick: () => void;
}

const SmallModalLayout: FC<SmallModalLayoutProps> = ({
  footer,
  children,
  modalTitle,
  isModalVisible,
  handleCancelClick,
  bgColor = "white",
  isFullScreen = false,
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
            "fixed right-0 top-0 z-[9999] flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-80 transition-all duration-300 ease-in-out"
          )}
        >
          <div className="relative h-full w-full">
            <div
              className={classNames(
                isFullScreen && "h-full w-full",
                "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform p-3"
              )}
            >
              <div
                ref={modalRef}
                className={classNames(
                  bgColor === "white" && "bg-white",
                  bgColor === "dark" && "bg-gray-900",
                  "flex h-full w-full flex-col justify-between rounded"
                )}
              >
                <div className="relative flex items-center justify-between px-3 py-2 pb-2 text-left md:px-6 md:py-4">
                  {modalTitle && (
                    <div>
                      <p className="font-secondary text-2xl font-bold">
                        {modalTitle}
                      </p>
                    </div>
                  )}
                  <button
                    className="cursor-pointer"
                    onClick={handleCancelClick}
                  >
                    <IoClose
                      className={classNames(
                        bgColor === "white" &&
                          "text-gray-800 hover:text-gray-500",
                        bgColor === "dark" &&
                          "text-gray-200 hover:text-gray-500",
                        "absolute right-2 top-2 h-8 w-9"
                      )}
                    />
                  </button>
                </div>
                <div className="h-full overflow-y-auto">{children}</div>
                {footer && <div>{footer}</div>}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmallModalLayout;
