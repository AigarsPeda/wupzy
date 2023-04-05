import Brackets from "components/elements/Brackets/Brackets";
import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import PlayoffDropdown from "components/elements/PlayoffDropdown/PlayoffDropdown";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import { api } from "utils/api";
import BracketsDropdown from "../BracketsDropdown/BracketsDropdown";

export type GameType = {
  team1: string | JSX.Element;
  team2: string | JSX.Element;
};

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
  const [teamCount, setTeamCount] = useState<number | null>(null);
  // const { data: games, refetch: refetchGames } =
  //   api.tournaments.getAllTournamentGames.useQuery({ tournamentId });
  const [brackets, setBrackets] = useState<[string, GameType[]][]>([]);
  const { data: teams, refetch: refetchTeams } =
    api.tournaments.getAllTournamentTeams.useQuery({
      // group,
      tournamentId,
    });

  const cratePlayOffMap = useCallback((num: number | null) => {
    if (!num) return new Map<string, GameType[]>();

    const originalNum = num;
    const playOffMap = new Map<string, GameType[]>();

    while (num > 0) {
      const arr = Array.from(Array(num).keys()).map((n) => {
        const games: GameType = {
          team1: ``,
          team2: ``,
        };

        if (num === originalNum) {
          games.team1 = <BracketsDropdown />;
          games.team2 = <BracketsDropdown />;
        }

        return games;
      });

      playOffMap.set(`${num}`, arr);

      num = Math.floor(num / 2);
    }

    return playOffMap;
  }, []);

  useEffect(() => {
    if (!teams) return;

    // console.log("games --->", createMap(teams?.teams));
    console.log("teams --->", teams?.teams);
  }, [teams]);

  useEffect(() => {
    setBrackets([...cratePlayOffMap(teamCount)]);
  }, [cratePlayOffMap, teamCount]);

  return (
    <ModalWrap
      isFullScreen
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Create playoffs"
      handleCancelClick={handleCancelClick}
    >
      <div className="h-full w-full overflow-x-auto pb-10">
        <InfoParagraph text="* Once playoffs are created, all other games will be finalized, and you will not be able to change or edit their scores." />
        <div className="mb-4 mr-3 flex justify-end">
          <PlayoffDropdown
            count={teamCount}
            handleCountClick={setTeamCount}
            availableLength={teams?.teams.length || 0}
          />
        </div>

        {/* {console.log("cratePlayOffMap", cratePlayOffMap(6))} */}
        {/* <GridLayout isGap minWith="175">
        {teams?.teams &&
          [...createMap(teams?.teams)].map(([group, teams]) => {
            return (
              <div key={group}>
                <p>{group}</p>
                <GroupTeamsCard teams={teams || []} />
              </div>
            );
          })}
      </GridLayout> */}

        <div className="ml-2">
          <Brackets brackets={brackets} />
        </div>
      </div>
    </ModalWrap>
  );
};

export default CreatePlayOffModal;
