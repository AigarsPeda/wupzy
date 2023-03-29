import EditGroupDropdown from "components/elements/EditGroupDropdown/EditGroupDropdown";
import type { EditType } from "components/elements/EditTournamentGroup/EditTournamentGroup";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { TeamsMapType } from "types/team.types";
import { api } from "utils/api";
import classNames from "utils/classNames";
import createTeamsMap from "utils/createTeamsMap";
import { getKeys } from "utils/teamsMapFunctions";
import SmallButton from "components/elements/SmallButton/SmallButton";

interface EditParticipantTeamsCardProps {
  tournamentId: string;
  handleStartEditGroup: (group: string, editKind: EditType) => void;
}

const EditParticipantTeamsCard: FC<EditParticipantTeamsCardProps> = ({
  tournamentId,
  handleStartEditGroup,
}) => {
  const [teamsMap, setTeamsMap] = useState<TeamsMapType>(new Map());
  const [isError, setIsError] = useState(false);
  const { data: teams, refetch: refetchGames } =
    api.tournaments.getTournamentTeams.useQuery({ tournamentId });
  const { mutateAsync: changeTeamsGroup } =
    api.tournaments.changeTeamsGroup.useMutation();

  const handleAddingTeam = async (teamId: string, newGroup: string) => {
    await changeTeamsGroup({
      teamId,
      tournamentId,
      group: newGroup,
    });
  };

  const addGroupToTournament = (group: string) => {
    setTeamsMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(group, []);
      return newMap;
    });
  };

  useEffect(() => {
    if (!teams) return;
    setTeamsMap(createTeamsMap(teams.teams).teamsMap);
  }, [teams]);

  return (
    <>
      <div className="mb-5 flex justify-end">
        <GroupDropdown
          handleGroupClick={addGroupToTournament}
          alreadyCreatedGroups={getKeys(teamsMap)}
        />
      </div>
      <GridLayout isGap minWith="350">
        {[...teamsMap].map(([group, teams]) => (
          <div
            key={`${group}`}
            className={classNames(
              isError && "border-2 border-red-500",
              "rounded-md border border-gray-50 bg-gray-50 px-3 py-3 shadow-md md:px-8"
            )}
          >
            <div className="flex justify-between">
              <h2 className="text-3xl">{group}</h2>
              <EditGroupDropdown
                handleEditGroupGame={() => {
                  handleStartEditGroup(group, "editGame");
                }}
                handleStartAddTeam={() => {
                  handleStartEditGroup(group, "addTeam");
                }}
              />
            </div>

            <ul>
              <div className="my-3 grid grid-cols-3 gap-4">
                <p className="text-xs">Name</p>
                <p className="text-xs">Change to</p>
              </div>
              {teams.map((team) => (
                <li
                  key={team.id}
                  className="grid grid-cols-3 gap-4 border-b-2 py-1"
                >
                  <p> {team.name}</p>
                  {getKeys(teamsMap).map((g, i) => {
                    if (g === group) return null;

                    return (
                      <SmallButton
                        btnTitle={g}
                        key={`${g}-${i}`}
                        btnClassNames="h-6 w-6 ml-2"
                        handleClick={() => {
                          handleAddingTeam(team.id, g).catch(() =>
                            setIsError(true)
                          );
                        }}
                      />
                    );
                  })}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </GridLayout>
    </>
  );
};

export default EditParticipantTeamsCard;
