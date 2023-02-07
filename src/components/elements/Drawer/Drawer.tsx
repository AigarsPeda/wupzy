import useDelayUnmount from "hooks/useDelayUnmount";
import useOnClickOutside from "hooks/useOnClickOutside";
import type { FC } from "react";
import { useRef } from "react";
import { classNames } from "utils/classNames";

interface DrawerProps {
  isDrawerOpen: boolean;
  drawerBtn: JSX.Element;
  drawerSide: "left" | "right";
  handleDropdownClose: () => void;
  children: JSX.Element | JSX.Element[];
}

const Drawer: FC<DrawerProps> = ({
  children,
  drawerBtn,
  drawerSide,
  isDrawerOpen,
  handleDropdownClose,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { shouldRender, isAnimation } = useDelayUnmount(isDrawerOpen, 175);

  useOnClickOutside<HTMLDivElement>(drawerRef, () => {
    handleDropdownClose();
  });

  return (
    <>
      <div className="relative inline-block text-left" ref={drawerRef}>
        {drawerBtn}
        {shouldRender && (
          <main
            className={classNames(
              isAnimation
                ? "opacity-100 transition-opacity"
                : "opacity-0 delay-150",
              "fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25 transition-all duration-150 ease-in-out"
            )}
          >
            <section
              className={classNames(
                isAnimation && drawerSide === "left"
                  ? "-translate-x-0"
                  : "-translate-x-full",
                isAnimation && drawerSide === "right"
                  ? "translate-x-0"
                  : "translate-x-full",
                drawerSide === "left" ? "left-0" : "",
                drawerSide === "right" ? "right-0" : "",
                "delay-400 absolute h-full w-screen max-w-lg transform bg-white shadow-xl transition-all duration-500 ease-in-out"
              )}
            >
              <article className="relative flex h-full w-screen max-w-lg flex-col space-y-6 overflow-y-scroll pb-10">
                <header className="p-4 text-lg font-bold">Header</header>
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
    </>
  );
};

export default Drawer;
