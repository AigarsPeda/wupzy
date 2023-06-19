import { useRef, type FC, type ReactNode } from "react";
import useDelayUnmount from "~/hooks/useDelayUnmount";
import useOnClickOutside from "~/hooks/useOnClickOutside";
import classNames from "~/utils/classNames";

interface DrawerLayoutProps {
  isDrawerOpen: boolean;
  drawerBtn: JSX.Element;
  header?: string | JSX.Element;
  drawerSide?: "left" | "right";
  handleDropdownClose: () => void;
  children: JSX.Element | JSX.Element[] | ReactNode;
}

const DrawerLayout: FC<DrawerLayoutProps> = ({
  header,
  children,
  drawerBtn,
  isDrawerOpen,
  handleDropdownClose,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { shouldRender, isAnimation } = useDelayUnmount(isDrawerOpen, 100);

  useOnClickOutside<HTMLDivElement>(drawerRef, () => {
    handleDropdownClose();
  });

  return (
    <>
      <div className="flex w-full justify-end">{drawerBtn}</div>
      {shouldRender && (
        <main
          className={classNames(
            isAnimation
              ? "translate-x-0 opacity-100 transition-opacity duration-500"
              : "translate-x-full opacity-0 transition-all delay-500",
            "fixed inset-0 z-10 transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out"
          )}
        >
          <section
            className={classNames(
              isAnimation ? "translate-x-0" : "translate-x-full",
              "delay-400 absolute right-0 h-full w-screen max-w-lg transform bg-white shadow-xl transition-all duration-500 ease-in-out"
            )}
          >
            <article className="relative flex h-full w-screen max-w-lg flex-col space-y-6 overflow-y-scroll pb-10">
              <header className="p-4 text-lg font-bold">{header}</header>
              {children}
            </article>
          </section>
          <section
            className=" h-full w-screen cursor-pointer "
            onClick={handleDropdownClose}
          ></section>
        </main>
      )}
    </>
  );
};

export default DrawerLayout;
