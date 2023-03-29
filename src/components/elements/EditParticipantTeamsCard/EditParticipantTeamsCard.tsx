import EditGroupDropdown from "components/elements/EditGroupDropdown/EditGroupDropdown";
import type { EditType } from "components/elements/EditTournamentGroup/EditTournamentGroup";
import GroupDropdown from "components/elements/GroupDropdown/GroupDropdown";
import SmallButton from "components/elements/SmallButton/SmallButton";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import type { TeamsMapType, TeamType } from "types/team.types";
import { api } from "utils/api";
import classNames from "utils/classNames";
import createTeamsMap from "utils/createTeamsMap";
import { getKeys } from "utils/teamsMapFunctions";

interface EditParticipantTeamsCardProps {
  tournamentId: string;
  setSelectedEdit: (group: string, editKind: EditType, team?: TeamType) => void;
}

const EditParticipantTeamsCard: FC<EditParticipantTeamsCardProps> = ({
  tournamentId,
  setSelectedEdit,
}) => {
  const [isError, setIsError] = useState(false);
  // const { data: teams, refetch: refetchTeams } =
  // api.tournaments.getTournamentTeams.useQuery({ tournamentId });
  const [teamsMap, setTeamsMap] = useState<TeamsMapType>(new Map());
  const { data: teams, refetch: refetchTeams } =
    api.tournaments.getTournamentTeams.useQuery({ tournamentId });
  const { mutateAsync: changeTeamsGroup } =
    api.tournaments.changeTeamsGroup.useMutation({
      onSuccess: async () => {
        await refetchTeams();
      },
    });

  const handleTeamsGroupChange = async (teamId: string, newGroup: string) => {
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
      {console.log("teamsMap", teamsMap)}
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
                  setSelectedEdit(group, "editGameOrder");
                }}
                handleStartAddTeam={() => {
                  setSelectedEdit(group, "addTeam");
                }}
              />
            </div>

            <ul>
              <li className="my-3 grid grid-cols-3 gap-4">
                <div className="flex justify-start">
                  <p className="text-xs">Name</p>
                </div>
                <div className="flex justify-center">
                  <p className="text-xs">Move to</p>
                </div>
                <div className="flex justify-end">
                  <p className="text-right text-xs">Option</p>
                </div>
              </li>
              {teams.map((team) => (
                <li key={team.id} className="grid grid-cols-3 gap-4 py-2">
                  <div className="flex justify-start">
                    <p> {team.name}</p>
                  </div>

                  <div className="flex justify-center">
                    {getKeys(teamsMap).map((g, i) => {
                      if (g === group) return <div key={`${g}-${i}`} />;

                      return (
                        <SmallButton
                          btnTitle={g}
                          key={`${g}-${i}`}
                          btnClassNames="h-6 w-6 ml-2"
                          handleClick={() => {
                            handleTeamsGroupChange(team.id, g).catch(() =>
                              setIsError(true)
                            );
                          }}
                        />
                      );
                    })}
                  </div>
                  <div className="flex justify-end">
                    <SmallButton
                      btnTitle={<FiEdit2 />}
                      btnClassNames="h-6 w-6 ml-2"
                      handleClick={() => {
                        setSelectedEdit(team.id, "editTeam", team);
                      }}
                    />
                  </div>
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
