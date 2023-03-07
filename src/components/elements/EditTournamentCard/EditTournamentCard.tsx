import Button from "components/elements/Button/Button";
import EditTournamentHeader from "components/elements/EditTournamentHeader/EditTournamentHeader";
import EditTournamentTeam from "components/elements/EditTournamentTeam/EditTournamentTeam";
import type { FC } from "react";
import type { TeamsMapType, TeamType } from "types/team.types";
import classNames from "utils/classNames";
import { getKeys } from "utils/teamsMapFunctions";

interface EditTournamentCardProps {
  teamsMap: TeamsMapType;
  groupToSmall: string[];
  teamToDelete: TeamType | null;
  handleCancelDeleteTeam: () => void;
  setTeamToDelete: (team: TeamType) => void;
  handleStartAddTeam: (str: string) => void;
  handleDeleteTeam: (team: TeamType) => Promise<void>;
  handleTeamsNameChange: (team: TeamType, newName: string) => void;
  handleGroupChange: (
    team: TeamType,
    oldGroup: string,
    newGroup: string
  ) => void;
}

const EditTournamentCard: FC<EditTournamentCardProps> = ({
  teamsMap,
  groupToSmall,
  teamToDelete,
  setTeamToDelete,
  handleDeleteTeam,
  handleStartAddTeam,
  handleGroupChange,
  handleTeamsNameChange,
  handleCancelDeleteTeam,
}) => {
  return (
    <>
      {[...teamsMap].map(([group, value], i) => {
        const isErrorMessageVisible = groupToSmall.includes(group);
        const isMoreThanOneGroup = getKeys(teamsMap).length > 1;

        return (
          <div
            key={`${group}-${i}`}
            className={classNames(
              isErrorMessageVisible && "border-2 border-red-500",
              "rounded-md border border-gray-50 bg-gray-50 px-8 py-3 shadow-md"
            )}
          >
            <div
              className={classNames(
                "relative ml-2 grid max-h-[22rem] min-h-[17rem] min-w-[9.375rem] grid-cols-1 content-start overflow-y-auto"
              )}
            >
              <EditTournamentHeader
                group={group}
                isMoreThanOneGroup={isMoreThanOneGroup}
              />
              {value.map((team, i) => {
                const isFirstGroup = i === 0;
                return (
                  <EditTournamentTeam
                    team={team}
                    key={team.id}
                    group={group}
                    teamsByGroup={teamsMap}
                    teamToDelete={teamToDelete}
                    isFirstGroup={isFirstGroup}
                    setTeamToDelete={setTeamToDelete}
                    handleDeleteTeam={handleDeleteTeam}
                    handleGroupChange={handleGroupChange}
                    handleTeamsNameChange={handleTeamsNameChange}
                    handleCancelDeleteTeam={handleCancelDeleteTeam}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              {isErrorMessageVisible && (
                <p className="text-xs text-red-500">
                  Group don&apos;t have enough teams. You need at least 4 teams.
                </p>
              )}
            </div>
            <div className="mt-4">
              <Button
                btnClass="mr-4 w-40"
                btnTitle="Add new team"
                onClick={() => {
                  handleStartAddTeam(group);
                }}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default EditTournamentCard;
