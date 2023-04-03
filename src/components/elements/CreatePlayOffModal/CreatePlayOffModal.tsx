import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import type { FC } from "react";
import { useEffect } from "react";
import { api } from "utils/api";
import createMap from "utils/createMap";
import GroupTeamsCard from "../GroupTeamsCard/GroupTeamsCard";

interface CreatePlayOffModalProps {
  isModalOpen: boolean;
  tournamentId: string;
  handleCancelClick: () => void;
}

const CreatePlayOffModal: FC<CreatePlayOffModalProps> = ({
  isModalOpen,
  tournamentId,
  handleCancelClick,
}) => {
  // const { data: games, refetch: refetchGames } =
  //   api.tournaments.getAllTournamentGames.useQuery({ tournamentId });

  const { data: teams, refetch: refetchTeams } =
    api.tournaments.getAllTournamentTeams.useQuery({
      // group,
      tournamentId,
    });

  useEffect(() => {
    if (!teams) return;

    console.log("games --->", createMap(teams?.teams));
  }, [teams]);

  // [[1, 2, 3, 4],[5,6],[7]]
  // const createArray = (num: number): number[][] => {
  //   const result: number[][] = [];

  //   while (num > 0) {
  //     const arr = Array.from(Array(num).keys()).map((el) => el + 1);

  //     result.push(arr);

  //     num = Math.floor(num / 2);
  //   }

  //   return result;
  // };

  const cratePlayOffMap = (num: number) => {
    const playOffMap = new Map<string, number[]>();

    while (num > 0) {
      const arr = Array.from(Array(num).keys()).map((el) => el + 1);

      playOffMap.set(`${num}`, arr);

      num = Math.floor(num / 2);
    }

    return playOffMap;
  };

  return (
    <ModalWrap
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Create playoffs"
      handleCancelClick={handleCancelClick}
    >
      <InfoParagraph text="* Once playoffs are created, all other games will be finalized, and you will not be able to change or edit their scores." />
      <p>Create playoffs</p>
      {console.log("cratePlayOffMap", cratePlayOffMap(8))}
      {teams?.teams &&
        [...createMap(teams?.teams)].map(([group, teams]) => {
          console.log("group --->", group);
          return (
            <div key={group}>
              <p>{group}</p>
              <GroupTeamsCard teams={teams || []} />
            </div>
          );
        })}
    </ModalWrap>
  );
};

export default CreatePlayOffModal;
