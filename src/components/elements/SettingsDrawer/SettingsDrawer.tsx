import { type FC } from "react";
import Button from "~/components/elements/Button/Button";
import TopDrawerLayout from "~/components/elements/TopDrawerLayout/TopDrawerLayout";
import useTournament from "~/hooks/useTournament";
import classNames from "~/utils/classNames";

const SettingsDrawer: FC = () => {
  const { isDeleting, deleteTournament } = useTournament();

  return (
    <TopDrawerLayout>
      <div
        className={classNames(
          "w-full bg-gray-800 px-4 py-4 text-white shadow-[0_2px_5px_rgba(0,0,0,0.07)] outline-none transition-all duration-300 ease-in-out md:px-12 md:py-4"
        )}
      >
        <h1>Tournament setting</h1>
        <div className="mt-10">
          <Button
            size="sm"
            color="red"
            isLoading={isDeleting}
            title="Delete tournament"
            handleClick={deleteTournament}
          />
        </div>
      </div>
    </TopDrawerLayout>
  );
};

export default SettingsDrawer;
