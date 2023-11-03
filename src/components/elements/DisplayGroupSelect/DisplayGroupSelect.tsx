import { type FC } from "react";
import classNames from "~/utils/classNames";
import SmallButton from "~/components/elements/SmallButton/SmallButton";

interface DisplayGroupSelectProps {
  selectedGroup: string;
  groups: string[] | undefined;
  setSelectedGroup: (group: string) => void;
}

const DisplayGroupSelect: FC<DisplayGroupSelectProps> = ({
  groups,
  selectedGroup,
  setSelectedGroup,
}) => {
  return (
    <>
      {groups && groups.length > 1 && (
        <div className="mb-6 mt-4 flex space-x-3">
          {/* <p className="flex items-center text-sm text-gray-500">Group:</p> */}
          {/* Sort  alphabetically */}
          {groups.sort().map((group, i) => (
            <div
              key={i}
              className={classNames(
                "relative flex items-center justify-center"
              )}
            >
              <SmallButton
                title={group}
                color={selectedGroup === group ? "dark" : "gray"}
                handleClick={() => {
                  setSelectedGroup(group);
                }}
              />

              <div
                className={classNames(
                  selectedGroup === group && "bg-gray-950",
                  "absolute -bottom-2 flex h-1 w-10 items-center justify-center rounded-md text-xs text-white"
                )}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default DisplayGroupSelect;
