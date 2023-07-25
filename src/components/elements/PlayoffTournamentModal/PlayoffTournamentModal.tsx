import { useEffect, useState, type FC } from "react";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import SetSelect from "~/components/elements/SetSelect/SetSelect";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import usePlayers from "~/hooks/usePlayers";
import useTeams from "~/hooks/useTeams";
import useTournament from "~/hooks/useTournament";
import { type PlayerType, type TeamType } from "~/types/tournament.types";
import {
  type PlayoffType,
  type PlayoffsTreeMatchType,
  type PlayoffsTreeTeamType,
} from "~/types/utils.types";
import countDivisionsByTwo from "~/utils/countDivisionsByTwo";
import createPlayoffRound from "~/utils/createPlayoffRound";
import genUniqueId from "../../../utils/genUniqueId";

export type TestPlayerType = {
  id: string;
  score: number;
  name: string;
};

export type TestPlayoffType = {
  id: string;
  round: number;
  match: number;
  teams: TestPlayerType[];
};

export type SelectedProperties = Pick<PlayerType | TeamType, "id" | "name">;

interface PlayoffTournamentModalProps {
  isPlayOffModal: boolean;
  handleCancelClicks: () => void;
}

const PlayoffTournamentModal: FC<PlayoffTournamentModalProps> = ({
  isPlayOffModal,
  handleCancelClicks,
}) => {
  const { teams } = useTeams();
  const { players } = usePlayers();
  const { tournament } = useTournament();
  const [playoffRounds, setPlayoffRounds] = useState<number[]>([]);
  const [selectedRoundsCount, setSelectedRoundsCount] = useState(0);

  // add one for every two players

  const addTeamsToPlayoffTree = (players: SelectedProperties[] | undefined) => {
    if (!players) {
      return [];
    }

    const firstRound = createPlayoffRound({
      players,
      selectedRoundsCount,
    });

    console.log("firstRound --->", firstRound);

    const playoffMap = new Map<number, TestPlayoffType[]>();

    for (let i = 0; i <= selectedRoundsCount; i++) {
      // i = round

      if (i === 0) {
        for (let j = 0; j < firstRound.length; j++) {
          // j = match

          const [player1, player2] = firstRound[j] || [];

          if (!player1 || !player2) {
            continue;
          }

          const team1: TestPlayerType = {
            score: 0,
            id: player1.id,
            name: player1.name,
          };

          const team2: TestPlayerType = {
            score: 0,
            id: player2.id,
            name: player2.name,
          };

          const playoffMatch: TestPlayoffType = {
            round: i,
            match: j,
            id: genUniqueId(),
            teams: [team1, team2],
          };

          const round = playoffMap.get(i);

          if (round) {
            round.push(playoffMatch);
          } else {
            playoffMap.set(i, [playoffMatch]);
          }
        }
      }

      // from previous round get matches with empty teams with no id and add them to current round
      else if (i > 0) {
        const previousRound = playoffMap.get(i - 1);

        if (previousRound) {
          for (let j = 0; j < previousRound.length; j++) {
            const match = previousRound[j];

            const [team1, team2] = match?.teams || [];

            if (
              match &&
              team1 &&
              team2 &&
              (team1.id === "" || team2.id === "")
            ) {
              const playoffMatch: TestPlayoffType = {
                ...match,
                round: i,
                match: j,
                teams: [team1, team2],
              };

              const round = playoffMap.get(i);

              if (round) {
                round.push(playoffMatch);
              } else {
                playoffMap.set(i, [playoffMatch]);
              }
            }
          }
        }
      }
    }

    const keys = Array.from(playoffMap.keys());
    const seenIds: string[] = [];

    // loop through playoffMap and add remove matches with teams with ids that have been seen twice
    for (let i = 0; i < keys.length; i++) {
      const round = playoffMap.get(keys[i] || 0);

      if (!round) {
        continue;
      }

      // add id to seenIds if match has one team with id
      for (let j = 0; j < round.length; j++) {
        const match = round[j];

        const [team1, team2] = match?.teams || [];

        if (team1 && team1?.id !== "" && team2?.id === "") {
          const timesSeen = seenIds.filter((id) => id === team1.id).length;

          if (timesSeen === 2) {
            // remove match from round
            round.splice(j, 1);
          }

          seenIds.push(team1.id);
        }

        if (team1?.id === "" && team2 && team2?.id !== "") {
          seenIds.push(team2.id);
        }
      }
    }

    console.log("playoffMap --->", playoffMap);

    const playoffTree: PlayoffType[] = [];

    return playoffTree;
  };

  useEffect(() => {
    if (players) {
      const length = players.length;
      let rounds = countDivisionsByTwo(length);

      // console.log("rounds --->", rounds);

      if (rounds % 2 !== 0) {
        rounds--;
      }

      console.log("rounds --->", rounds);

      const playoffRounds = Array.from({ length: rounds }, (_, i) => i + 1);
      const lastRound = playoffRounds[playoffRounds.length - 1] || 0;

      setPlayoffRounds(playoffRounds);
      selectedRoundsCount === 0 && setSelectedRoundsCount(rounds);
    }
  }, [teams, players, selectedRoundsCount]);

  return (
    <ModalLayout
      isFullScreen
      bgColor="gray"
      isModalVisible={isPlayOffModal}
      handleCancelClick={handleCancelClicks}
      // header={<h1 className="truncate text-3xl">Create {tournament?.name} PAYOFFS</h1>}
      header={<h1 className="truncate text-3xl">Create PAYOFFS</h1>}
    >
      <div className="dots h-full w-full">
        <div className="flex px-3 py-2 pb-2 md:px-6 md:py-4">
          <SetSelect
            options={playoffRounds}
            selectedSetCount={selectedRoundsCount}
            handleSetSelect={setSelectedRoundsCount}
          />
        </div>

        <div className="flex h-[80%] w-full overflow-y-auto px-3 py-2 pb-2 md:justify-center  md:px-6 md:py-4">
          <PlayoffsTree
            playoffTree={addTeamsToPlayoffTree(
              tournament?.type === "king" ? players : teams
            )}
          />
        </div>
      </div>
    </ModalLayout>
  );
};

export default PlayoffTournamentModal;
