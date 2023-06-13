import { type FC } from "react";
import TopDrawerLayout from "~/components/elements/TopDrawerLayout/TopDrawerLayout";
import classNames from "~/utils/classNames";

const SettingsDrawer: FC = () => {
  return (
    <TopDrawerLayout>
      <div
        className={classNames(
          "w-full bg-gray-800 px-4 py-4 text-white shadow-[0_2px_5px_rgba(0,0,0,0.07)] outline-none transition-all duration-300 ease-in-out md:px-12 md:py-4"
        )}
      >
        <h1>Tournament setting</h1>
        <p>Randomize game order</p>
      </div>
    </TopDrawerLayout>
  );
};

export default SettingsDrawer;
