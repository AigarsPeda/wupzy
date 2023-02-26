import useDelayUnmount from "hooks/useDelayUnmount";
import useOnClickOutside from "hooks/useOnClickOutside";
import type { FC, ReactNode } from "react";
import { useRef } from "react";
import classNames from "utils/classNames";

interface DrawerProps {
  header?: string;
  drawerSide?: "left";
  isDrawerOpen: boolean;
  drawerBtn: JSX.Element;
  handleDropdownClose: () => void;
  children: JSX.Element | JSX.Element[] | ReactNode;
}

const Drawer: FC<DrawerProps> = ({
  header,
  children,
  drawerBtn,
  isDrawerOpen,
  drawerSide = "left",
  handleDropdownClose,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { shouldRender, isAnimation } = useDelayUnmount(isDrawerOpen, 175);

  useOnClickOutside<HTMLDivElement>(drawerRef, () => {
    handleDropdownClose();
  });

  return (
    <div className="relative inline-block text-left" ref={drawerRef}>
      {drawerBtn}
      {shouldRender && (
        <main
          className={classNames(
            isAnimation ? "opacity-100" : "opacity-0 delay-150",
            "fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25 transition-all duration-150 ease-in-out"
          )}
        >
          <section
            className={classNames(
              isAnimation && drawerSide === "left"
                ? "left-0 translate-x-0"
                : "-translate-x-full",
              "delay-400 absolute h-full w-screen max-w-[23rem] transform bg-white shadow-md transition-all duration-500 ease-in-out"
            )}
          >
            {/* <article className="relative flex h-full w-screen max-w-lg flex-col space-y-6 overflow-y-scroll "> */}
            <article className="relative flex flex-col space-y-6 px-4 pb-10 pt-4">
              {header && (
                <header className="p-4 text-lg font-bold">{header}</header>
              )}
              {children}
            </article>
          </section>
          <section
            className="h-full w-screen cursor-pointer"
            onClick={handleDropdownClose}
          ></section>
        </main>
      )}
    </div>
  );
};

export default Drawer;
