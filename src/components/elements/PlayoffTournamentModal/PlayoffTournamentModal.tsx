import { useEffect, useState, type FC } from "react";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import SetSelect from "~/components/elements/SetSelect/SetSelect";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import usePlayers from "~/hooks/usePlayers";
import useTeams from "~/hooks/useTeams";
import useTournament from "~/hooks/useTournament";
import { type PlayerType, type TeamType } from "~/types/tournament.types";
import countDivisionsByTwo from "~/utils/countDivisionsByTwo";
import createPlayoffTree from "~/utils/createPlayoffTree";

type SelectedProperties = Pick<PlayerType | TeamType, "id" | "name">;

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

    // const playoffTree: PlayoffType[] = [];
    const playersCount = Math.pow(2, selectedRoundsCount) * 2;

    // select players for the first round based on playoff rounds count
    const selectedPlayers = players.slice(0, playersCount);

    if (playersCount > selectedPlayers.length) {
      // add empty players to the end of the array
      const emptyPlayersCount = playersCount - selectedPlayers.length;

      for (let i = 0; i < emptyPlayersCount; i++) {
        const emptyPlayer = {
          id: "",
          score: 0,
          name: "n/a",
        };

        selectedPlayers.push(emptyPlayer);
      }
    }

    // const middleIndex = Math.floor(selectedPlayers.length / 2);
    // const nextRoundPlayers: PlayoffsTreeTeamType[] = [];

    const playoffTree = createPlayoffTree(playersCount, selectedRoundsCount);

    // for (let i = 0; i <= selectedRoundsCount; i++) {
    //   const round: PlayoffType = {
    //     id: i,
    //     matches: [],
    //     name: `Round ${i + 1}`,
    //   };

    //   if (i === 0) {
    //     // Start with pointers at the middle index
    //     let leftPointer = middleIndex;
    //     let rightPointer = middleIndex;

    //     // If the array length is even, move the left pointer one step back
    //     if (middleIndex % 2 === 0) {
    //       leftPointer--;
    //     }

    //     while (leftPointer >= 0 || rightPointer < selectedPlayers.length) {
    //       const leftPlayer = selectedPlayers[leftPointer];
    //       const rightPlayer = selectedPlayers[rightPointer];

    //       const match: PlayoffsTreeMatchType = {
    //         id: leftPointer,
    //         name: leftPointer + 1,
    //         right: false,
    //         left: false,
    //         teams: [],
    //       };

    //       if (leftPlayer) {
    //         match.teams.push({
    //           score: 0,
    //           id: leftPlayer.id,
    //           name: leftPlayer.name || "",
    //           round: match.id,
    //           match: i,
    //           game: leftPointer,
    //         });

    //         if (rightPlayer?.name === "n/a") {
    //           nextRoundPlayers.push({
    //             id: leftPlayer.id,
    //             name: leftPlayer.name || "n/a",
    //             score: 0,
    //             round: i + 1,
    //             match: i,
    //             game: leftPointer,
    //           });
    //         }
    //       }

    //       if (rightPlayer) {
    //         match.teams.push({
    //           score: 0,
    //           id: rightPlayer.id,
    //           name: rightPlayer.name || "",
    //           round: match.id,
    //           match: i,
    //           game: leftPointer,
    //         });

    //         // if (leftPlayer?.name === "n/a") {
    //         //   nextRoundPlayers.push({
    //         //     id: rightPlayer.id,
    //         //     name: rightPlayer.name || "n/a",
    //         //     score: 0,
    //         //     round: i + 1,
    //         //     match: i,
    //         //     game: leftPointer / 2,
    //         //   });
    //         // }
    //       }

    //       round.matches.push(match);
    //       round.matches.sort((a, b) => a.id - b.id);

    //       leftPointer--;
    //       rightPointer++;
    //     }
    //   } else {
    //     // add empty matches to other rounds every next round has half of the matches
    //     // const matchesCount = Math.pow(2, selectedRoundsCount - i);

    //     // get previous round matches count and divide it by 2
    //     const prevRound = playoffTree[i - 1]?.matches.length || 0;
    //     const matchesCount = Math.floor(prevRound / 2);

    //     for (let j = 0; j < matchesCount; j++) {
    //       const match: PlayoffsTreeMatchType = {
    //         id: j,
    //         name: j + 1,
    //         right: false,
    //         left: false,
    //         teams: [
    //           {
    //             id: "1",
    //             name: "",
    //             score: 0,
    //             round: j,
    //             match: j,
    //             game: j,
    //           },
    //           {
    //             id: "2",
    //             name: "",
    //             score: 0,
    //             round: j,
    //             match: j,
    //             game: j,
    //           },
    //         ],
    //       };

    //       round.matches.push(match);
    //     }
    //   }

    //   playoffTree.push(round);
    // }

    // console.log("nextRoundPlayers", nextRoundPlayers);

    // // add next round players to the next round
    // nextRoundPlayers.forEach((player) => {
    //   const round = playoffTree[player.round];

    //   if (!round) {
    //     return;
    //   }

    //   const match = round.matches.find((match) => match.id === player.match);

    //   if (match) {
    //     // replace team with player in place
    //     match.teams.forEach((team, i) => {
    //       if (player.game === i) {
    //         team.id = player.id;
    //         team.name = player.name;
    //       }
    //     });
    //   }
    // });

    console.log("playoffTree", playoffTree);

    return playoffTree;
  };

  useEffect(() => {
    if (players) {
      const length = players.length;
      let rounds = countDivisionsByTwo(length);

      if (rounds % 2 !== 0) {
        rounds--;
      }

      const playoffRounds = Array.from({ length: rounds }, (_, i) => i + 1);
      const lastRound = playoffRounds[playoffRounds.length - 1] || 0;

      setPlayoffRounds(playoffRounds);
      selectedRoundsCount === 0 && setSelectedRoundsCount(lastRound);
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
        {/* md:justify-center */}
        <div className="flex h-[80%] w-full overflow-y-auto px-3 py-2 pb-2  md:px-6 md:py-4">
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
