import useDelayUnmount from "hooks/useDelayUnmount";
import useOnClickOutside from "hooks/useOnClickOutside";
import type { FC } from "react";
import { useRef } from "react";

interface DropdownProps {
  isDropdownOpen: boolean;
  dropdownBtn: JSX.Element;
  handleDropdownClose: () => void;
  children: JSX.Element | JSX.Element[];
}

const Dropdown: FC<DropdownProps> = ({
  children,
  dropdownBtn,
  isDropdownOpen,
  handleDropdownClose,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { shouldRender, isAnimation } = useDelayUnmount(isDropdownOpen, 100);

  useOnClickOutside<HTMLDivElement>(dropdownRef, () => {
    handleDropdownClose();
  });

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        {dropdownBtn}
        {shouldRender && (
          <div
            className={`${
              isAnimation
                ? "visible translate-x-0 scale-100 opacity-100"
                : "invisible scale-95 opacity-0"
            } absolute top-[3.8rem] right-0 z-10 w-48 origin-top-right -translate-y-2 transform-gpu rounded-md bg-white shadow-md transition-all duration-150`}
          >
            <div className="max-h-80 w-full overflow-y-auto rounded border border-gray-50">
              {children}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
