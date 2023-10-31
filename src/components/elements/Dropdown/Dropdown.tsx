import { useRef, type FC } from "react";
import useDelayUnmount from "~/hooks/useDelayUnmount";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import classNames from "~/utils/classNames";

interface DropdownProps {
  top?: "3" | "2.2";
  dropdownClass?: string;
  isDropdownOpen: boolean;
  dropdownBtn: JSX.Element;
  handleDropdownClose: () => void;
  children: JSX.Element | JSX.Element[];
  width?: "full" | "20" | "32" | "40" | "52" | "auto";
}

const Dropdown: FC<DropdownProps> = ({
  children,
  top = "3.8",
  dropdownBtn,
  width = "32",
  dropdownClass,
  isDropdownOpen,
  handleDropdownClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { shouldRender, isAnimation } = useDelayUnmount(isDropdownOpen, 100);

  useOnClickOutside<HTMLDivElement>(dropdownRef, () => {
    handleDropdownClose();
  });

  return (
    <div
      ref={dropdownRef}
      className={classNames(
        width === "32" && "w-32",
        width === "40" && "w-40",
        width === "52" && "w-52",
        width === "auto" && "w-auto",
        width === "full" && "w-full",
        "relative inline-block text-left"
      )}
    >
      {dropdownBtn}
      {shouldRender && (
        <div
          className={classNames(
            width === "32" && "w-32",
            width === "40" && "w-40",
            width === "52" && "w-52",
            width === "auto" && "w-auto",
            width === "full" && "w-full",
            isAnimation
              ? "visible translate-x-0 scale-100 opacity-100"
              : "invisible scale-95 opacity-0",
            "absolute right-0 z-[999] origin-top-right -translate-y-2.5 transform-gpu rounded-md bg-white shadow-md transition-all duration-150",
            top === "3" && "top-[3rem]",
            top === "2.2" && "top-[2.2rem]",
            dropdownClass && dropdownClass
          )}
        >
          <div
            className={classNames(
              "max-h-80 w-full overflow-y-auto rounded border border-gray-100"
            )}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
