import useDelayUnmount from "hooks/useDelayUnmount";
import useOnClickOutside from "hooks/useOnClickOutside";
import type { FC } from "react";
import { useRef, useState } from "react";
import classNames from "utils/classNames";

// interface SettingsDrawerProps {}

const SettingsDrawer: FC = ({}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { shouldRender, isAnimation } = useDelayUnmount(isDrawerOpen, 50);

  useOnClickOutside<HTMLDivElement>(drawerRef, () => {
    setIsDrawerOpen(false);
  });

  return (
    <div className="relative" ref={drawerRef}>
      <div
        className={classNames(
          isAnimation ? "translate-y-0" : "translate-y-[-100%]",
          "absolute left-0 right-0 top-0 z-[10] transition duration-300 ease-in-out "
        )}
      >
        {shouldRender && (
          <div
            className={classNames(
              isAnimation ? "h-20" : "h-0",
              "w-full bg-black text-white shadow-sm outline-none transition-all duration-300 ease-in-out"
            )}
          >
            Test text{" "}
          </div>
        )}
        <div className="absolute -bottom-5 right-0 z-40 flex justify-end px-4 md:px-12">
          <button
            className="h-5 w-20 rounded-b-md bg-green-500 text-xs text-white"
            onClick={() => {
              setIsDrawerOpen((state) => !state);
            }}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsDrawer;
