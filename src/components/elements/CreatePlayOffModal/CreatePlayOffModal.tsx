import Brackets from "components/elements/Brackets/Brackets";
import BracketsDropdown from "components/elements/BracketsDropdown/BracketsDropdown";
import InfoParagraph from "components/elements/InfoParagraph/InfoParagraph";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import PlayoffDropdown from "components/elements/PlayoffDropdown/PlayoffDropdown";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import type { TeamType, TeamsMapType } from "types/team.types";
import { api } from "utils/api";
import createAllPossibleOddNumberArray from "utils/createAllPossibleOddNumberArray";
import createMap from "utils/createMap";
import getRandomValues from "utils/getRandomValues";
import getShortestGroup from "utils/getShortestGroup";
import sortMap from "utils/sortMap";

export type GameType = {
  team1: string | JSX.Element;
  team2: string | JSX.Element;
};

interface CreatePlayOffModalProps {
  isModalOpen: boolean;
  tournamentId: string;
  handleCancelClick: () => void;
}

type SelectedTeamsType = {
  [key: string]: {
    team1: TeamType | undefined;
    team2: TeamType | undefined;
  };
};

const CreatePlayOffModal: FC<CreatePlayOffModalProps> = ({
  isModalOpen,
  tournamentId,
  handleCancelClick,
}) => {
  const [teamCount, setTeamCount] = useState<number | null>(null);
  const [teamsMap, setTeamsMap] = useState<TeamsMapType>(new Map());
  const [brackets, setBrackets] = useState<[string, GameType[]][]>([]);
  const [selectedTeams, setSelectedTeams] = useState<SelectedTeamsType[]>([]);
  const { data: teams } = api.tournaments.getAllTournamentTeams.useQuery({
    tournamentId,
  });

  const cratePlayOffMap = useCallback(
    (num: number | null, map: TeamsMapType) => {
      if (!num) return new Map<string, GameType[]>();

      const originalNum = num;
      const keys = Array.from(map.keys());
      const selected: SelectedTeamsType[] = [];
      const playOffMap = new Map<string, GameType[]>();
      const isSlice = keys.length > 1;

      while (num > 0) {
        const arr = Array.from(Array(num).keys()).map((n) => {
          const randomGroup = getRandomValues(num || 0, keys);
          const firstGroup = randomGroup[0] || "";
          const secondGroup = randomGroup[1] || "";

          const firstGroupTeams = isSlice
            ? map.get(firstGroup)?.slice(0, originalNum)
            : map.get(firstGroup) || [];
          const secondGroupTeams = isSlice
            ? map.get(secondGroup)?.slice(0, originalNum)
            : map.get(secondGroup) || [];

          const firstGroupTeamsLength = firstGroupTeams?.length || 0;

          const isOdd = firstGroupTeamsLength % 2 !== 0;
          if (!isSlice && isOdd && firstGroupTeams) {
            const firstTeam = firstGroupTeams[0];

            if (firstTeam) {
              firstTeam.points = 0;
              firstGroupTeams.push(firstTeam);
            }
          }

          const games: GameType = {
            team1: ``,
            team2: ``,
          };

          if (num === originalNum && firstGroupTeams && secondGroupTeams) {
            const firstTeam = firstGroupTeams[n];
            const secondTeam =
              secondGroupTeams[secondGroupTeams.length - (n + 1)];

            games.team1 = (
              <BracketsDropdown
                teamsMap={map}
                selectedTeam={firstTeam}
                handleRemoveSelected={(t) => {
                  console.log("t", t);
                  console.log("brackets", brackets);
                }}
              />
            );

            games.team2 = (
              <BracketsDropdown
                teamsMap={map}
                handleRemoveSelected={(t) => {
                  console.log("t", t);
                }}
                selectedTeam={
                  Boolean(firstTeam?.id !== secondTeam?.id)
                    ? secondTeam
                    : undefined
                }
              />
            );

            selected.push({
              [n]: {
                team1: firstTeam,
                team2:
                  secondTeam?.id === firstTeam?.id ? undefined : secondTeam,
              },
            });
          }

          return games;
        });

        playOffMap.set(`${num}`, arr);

        num = Math.floor(num / 2);
      }

      setSelectedTeams(selected);

      return playOffMap;
    },
    []
  );

  useEffect(() => {
    if (!teams) return;

    const tMap = sortMap(createMap(teams?.teams));
    const numArray = createAllPossibleOddNumberArray(getShortestGroup(tMap));
    const lastNum = numArray.pop();

    setTeamsMap(tMap);
    setTeamCount(lastNum || null);
  }, [teams]);

  useEffect(() => {
    setBrackets([...cratePlayOffMap(teamCount, teamsMap)]);
  }, [cratePlayOffMap, teamCount, teamsMap]);

  return (
    <ModalWrap
      isFullScreen
      modalWidth="7xl"
      topPosition="top"
      isModalVisible={isModalOpen}
      modalTitle="Create playoffs"
      handleCancelClick={handleCancelClick}
    >
      {console.log("selectedTeams", selectedTeams)}
      <div className="h-full w-full overflow-x-auto overflow-y-auto pb-10">
        <InfoParagraph text="* Once playoffs are created, all other games will be finalized, and you will not be able to change or edit their scores." />
        <div className="mb-4 mr-3 flex justify-end">
          <PlayoffDropdown
            count={teamCount}
            handleCountClick={setTeamCount}
            availableLength={getShortestGroup(teamsMap)}
          />
        </div>

        <div className="ml-2 min-w-[25rem]">
          <Brackets brackets={brackets} />
        </div>
      </div>
    </ModalWrap>
  );
};

export default CreatePlayOffModal;
