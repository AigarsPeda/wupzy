import { ALPHABET } from "hardcoded";
import { useEffect, useState, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import GridLayout from "~/components/layout/GridLayout/GridLayout";
import useTeams from "~/hooks/useTeams";
import { type TeamType } from "~/types/tournament.types";
import { type TeamsMapType } from "~/types/utils.types";
import { api } from "~/utils/api";
import changeTeamsGroup from "~/utils/changeTeamsGroup";
import classNames from "~/utils/classNames";
import genUniqueId from "~/utils/genUniqueId";
import groupTeamsByGroup from "~/utils/groupTeamsByGroup";

interface TeamsSplitProps {
  handleModalClose: () => void;
}

const TeamsSplit: FC<TeamsSplitProps> = ({ handleModalClose }) => {
  const { teams, isLoading, tournamentId } = useTeams();
  const [availableGroups, setAvailableGroups] = useState<string[]>([]);
  const [teamsByGroup, setTeamsByGroup] = useState<TeamsMapType>(
    new Map<string, TeamType[]>()
  );

  const {
    game: invalidateGames,
    teams: invalidateTeams,
    player: invalidatePlayers,
  } = api.useContext();
  const { mutate, isLoading: isSplitting } =
    api.teams.splitTeamsInGroups.useMutation({
      onSuccess: () => {
        void invalidateGames.invalidate();
        void invalidateTeams.invalidate();
        void invalidatePlayers.invalidate();
        handleModalClose();
      },
    });

  const addGroup = () => {
    const newGroup = availableGroups[0];

    if (!newGroup) return;

    const newTeamsByGroup = new Map(teamsByGroup);
    newTeamsByGroup.set(newGroup, []);
    setTeamsByGroup(newTeamsByGroup);
    setAvailableGroups(availableGroups.slice(1));
  };

  const mapToArr = (map: TeamsMapType) => {
    return Array.from(map.values()).flat();
  };

  useEffect(() => {
    if (!teams || isLoading) return;

    const { groups, teamsByGroup } = groupTeamsByGroup(teams);

    setAvailableGroups(() => {
      const availableGroups = ALPHABET.filter(
        (letter) => !groups.includes(letter)
      );
      return availableGroups;
    });

    setTeamsByGroup(teamsByGroup);
  }, [teams, isLoading]);

  return (
    <div className="w-full">
      <div className="mb-4 flex w-full items-center justify-between">
        <div className="w-full">
          <p className="font-primary text-red-600">
            * Splitting the tournament in groups will result in a reset of all
            scores and matches.
          </p>
        </div>
        <div>
          <SmallButton title="Add group" color="green" handleClick={addGroup} />
        </div>
      </div>

      <GridLayout minWith="300" isGap>
        {Array.from(teamsByGroup).map(([group, teams]) => {
          const allKeys = Array.from(teamsByGroup.keys());

          return (
            <div
              key={genUniqueId()}
              className="min-h-[17rem] w-full overflow-x-auto rounded border border-gray-200 p-2 shadow-md"
            >
              <div className="mb-4 grid grid-cols-12 gap-4">
                <h2 className="col-span-3 text-4xl">{group}</h2>
                <div className="col-span-2 flex items-center">
                  <p className="text-xs font-semibold">Move to</p>
                </div>
              </div>

              <ul>
                {teams.map((team, i) => {
                  return (
                    <li
                      key={genUniqueId()}
                      className={classNames(
                        i !== teams.length - 1 &&
                          "mb-2 border-b border-gray-200",
                        "grid grid-cols-12 gap-4 px-2 pb-1"
                      )}
                    >
                      <div className="col-span-3 flex items-center">
                        <p>{team.name}</p>
                      </div>

                      <div className="col-span-7 flex items-center space-x-2">
                        {allKeys.map((group) => {
                          if (group === team.group) return null;

                          return (
                            <div key={genUniqueId()} className="max-w-[5rem]">
                              <SmallButton
                                title={group}
                                isFullWidth
                                color="gray"
                                handleClick={() => {
                                  const newTeamsByGroup = changeTeamsGroup({
                                    team,
                                    group,
                                    teamsByGroup,
                                  });

                                  setTeamsByGroup(newTeamsByGroup);
                                }}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </GridLayout>

      <div className="flex justify-end">
        <div>
          <Button
            title="Split"
            isLoading={isSplitting}
            handleClick={() => {
              void mutate({
                tournamentId,
                teams: mapToArr(teamsByGroup),
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TeamsSplit;
