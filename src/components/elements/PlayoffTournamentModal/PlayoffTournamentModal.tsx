import { useEffect, type FC } from "react";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import usePlayers from "~/hooks/usePlayers";
import useTeams from "~/hooks/useTeams";
import { type TeamType, type PlayerType } from "~/types/tournament.types";
import {
  type PlayoffType,
  type PlayoffsTreeMatchType,
} from "~/types/utils.types";
import countDivisionsByTwo from "~/utils/countDivisionsByTwo";

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

  const createPlayoffTree = (players: PlayerType[] | TeamType[]) => {
    const playoffTree: PlayoffType[] = [];
    const rounds = countDivisionsByTwo(players.length);
    const middleIndex = Math.round(players.length / 2);

    for (let i = 0; i <= rounds; i++) {
      const round: PlayoffType = {
        id: i,
        matches: [],
        name: `Round ${i + 1}`,
      };

      if (i === 0) {
        // Start with pointers at the middle index
        let leftPointer = middleIndex;
        let rightPointer = middleIndex;

        // If the array length is even, move the left pointer one step back
        if (middleIndex % 2 === 0) {
          leftPointer--;
        }

        while (leftPointer >= 0 || rightPointer < players.length) {
          const leftPlayer = players[leftPointer];
          const rightPlayer = players[rightPointer];

          const match: PlayoffsTreeMatchType = {
            id: leftPointer,
            name: `Match ${leftPointer + 1}`,
            right: false,
            left: false,
            teams: [],
          };

          if (leftPlayer) {
            match.teams.push({
              score: 0,
              id: leftPlayer.id,
              name: leftPlayer.name || "n/a",
            });
          } else {
            match.teams.push({
              id: "",
              name: "",
              score: 0,
            });
          }

          if (rightPlayer) {
            match.teams.push({
              score: 0,
              id: rightPlayer.id,
              name: rightPlayer.name || "n/a",
            });
          } else {
            match.teams.push({
              id: "",
              name: "",
              score: 0,
            });
          }

          round.matches.push(match);

          leftPointer--;
          rightPointer++;
        }
      } else {
        // add empty matches to other rounds every next round has half of the matches
        const matchesCount = players.length / Math.pow(2, i) / 2;

        for (let j = 0; j < matchesCount; j++) {
          const match: PlayoffsTreeMatchType = {
            id: j,
            name: `Match ${j + 1}`,
            right: false,
            left: false,
            teams: [
              {
                id: "1",
                name: "",
                score: 0,
              },
              {
                id: "2",
                name: "",
                score: 0,
              },
            ],
          };

          round.matches.push(match);
        }
      }

      playoffTree.push(round);
    }

    // for (let i = 0; i <= rounds; i++) {
    //   const round = {
    //     id: i,
    //     name: `Round ${i + 1}`,
    //     matches: [],
    //   };

    //   playoffTree.push(round);
    // }

    // const firstRound = playoffTree[0];

    // if (!firstRound) {
    //   return [];
    // }

    // // const middleIndex = Math.round(players.length / 2);

    // // Start with pointers at the middle index
    // let leftPointer = middleIndex;
    // let rightPointer = middleIndex;

    // // If the array length is even, move the left pointer one step back
    // if (middleIndex % 2 === 0) {
    //   leftPointer--;
    // }

    // while (leftPointer >= 0 || rightPointer < players.length) {
    //   const leftPlayer = players[leftPointer];
    //   const rightPlayer = players[rightPointer];

    //   const match: PlayoffsTreeMatchType = {
    //     id: leftPointer,
    //     name: `Match ${leftPointer + 1}`,
    //     right: false,
    //     left: false,
    //     teams: [],
    //   };

    //   if (leftPlayer) {
    //     match.teams.push({
    //       id: leftPlayer.id,
    //       name: leftPlayer.name,
    //       score: 0,
    //     });
    //   }

    //   if (rightPlayer) {
    //     match.teams.push({
    //       id: rightPlayer.id,
    //       name: rightPlayer.name,
    //       score: 0,
    //     });
    //   }

    //   firstRound.matches.push(match);

    //   leftPointer--;
    //   rightPointer++;
    // }

    // // add empty matches to other rounds
    // for (let i = 1; i < playoffTree.length; i++) {
    //   const round = playoffTree[i];

    //   if (!round) {
    //     continue;
    //   }

    //   // add empty matches to other rounds every next round has half of the matches
    //   const matchesCount = players.length / Math.pow(2, i) / 2;

    //   console.log("matchesCount", matchesCount);

    //   for (let j = 0; j < matchesCount; j++) {
    //     const match: PlayoffsTreeMatchType = {
    //       id: j,
    //       name: `Match ${j + 1}`,
    //       right: false,
    //       left: false,
    //       teams: [
    //         {
    //           id: "1",
    //           name: "",
    //           score: 0,
    //         },
    //         {
    //           id: "2",
    //           name: "",
    //           score: 0,
    //         },
    //       ],
    //     };

    //     round.matches.push(match);
    //   }
    // }

    return playoffTree;
  };

  useEffect(() => {
    console.log("teams", teams);
    console.log("players", players);
  }, [teams, players]);

  return (
    <ModalLayout
      isFullScreen
      bgColor="gray"
      isModalVisible={isPlayOffModal}
      handleCancelClick={handleCancelClicks}
      // header={<h1 className="truncate text-3xl">Create {tournament?.name} PAYOFFS</h1>}
      header={<h1 className="truncate text-3xl">Create PAYOFFS</h1>}
    >
      <div className="dots flex h-full w-full overflow-y-auto px-3 py-2 pb-2 md:justify-center md:px-6 md:py-4">
        <PlayoffsTree playoffTree={createPlayoffTree(players || [])} />
      </div>
    </ModalLayout>
  );
};

export default PlayoffTournamentModal;
