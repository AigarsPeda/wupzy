import { useEffect, useState, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import SetSelect from "~/components/elements/SetSelect/SetSelect";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
import usePlayers from "~/hooks/usePlayers";
import useTeams from "~/hooks/useTeams";
import useTournament from "~/hooks/useTournament";
import { type PlayoffMapType } from "~/types/playoff.types";
import { type PlayerType, type TeamType } from "~/types/tournament.types";
import { api } from "~/utils/api";
import createPlayoffRounds from "~/utils/createPlayoffRounds";
import formatTeamsToPlayoffTree from "~/utils/formatTeamsToPlayoffTree";

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
  const [playoffTree, setPlayoffTree] = useState<PlayoffMapType>(new Map());
  const { mutate, isLoading } = api.playoffs.createPlayoffGames.useMutation({
    onSuccess: () => {
      handleCancelClicks();
    },
  });

  const handlePlayOffSave = () => {
    if (!tournament?.id) {
      return;
    }

    const values = Array.from(playoffTree.values());
    const flatValues = values.flat();

    mutate({
      playoffGames: flatValues,
      tournamentId: tournament?.id,
    });
  };

  useEffect(() => {
    if (players) {
      const length = players.length;
      const { playoffRounds, largestPossibleTeams } =
        createPlayoffRounds(length);

      setPlayoffRounds(playoffRounds);
      selectedRoundsCount === 0 && setSelectedRoundsCount(largestPossibleTeams);
    }

    if (teams) {
      const length = teams.length;
      const { playoffRounds, largestPossibleTeams } =
        createPlayoffRounds(length);

      setPlayoffRounds(playoffRounds);
      selectedRoundsCount === 0 && setSelectedRoundsCount(largestPossibleTeams);
    }
  }, [teams, players, selectedRoundsCount]);

  useEffect(() => {
    if (players || teams) {
      const playoffTree = formatTeamsToPlayoffTree(
        tournament?.type === "king" ? players : teams,
        selectedRoundsCount
      );

      if (playoffTree) {
        setPlayoffTree(playoffTree);
      }
    }
  }, [players, selectedRoundsCount, teams, tournament?.type]);

  return (
    <ModalLayout
      isDots
      isFullScreen
      bgColor="gray"
      isModalVisible={isPlayOffModal}
      handleCancelClick={handleCancelClicks}
      header={
        <h1 className="truncate text-3xl">Create {tournament?.name} PAYOFFS</h1>
      }
    >
      <div className="h-full px-3 py-2 pb-2 md:px-6 md:py-4">
        <div className="flex">
          <SetSelect
            isFormatted
            options={playoffRounds}
            selectedSetCount={selectedRoundsCount}
            handleSetSelect={setSelectedRoundsCount}
          />

          <div className="ml-4 w-36">
            <Button
              size="sm"
              type="button"
              isLoading={isLoading}
              title="Create playoff"
              handleClick={handlePlayOffSave}
            />
          </div>
        </div>

        {/* <line
              x1={cx}
              y1={cy + 15}
              x2={x + step - leftOffset / 2}
              y2={y + (depth + 1) * 50}
              stroke="black"
            /> */}
        <div className="mt-10 overflow-x-auto overflow-y-auto pb-10">
          <PlayoffsTree playoffTree={playoffTree} />
        </div>
      </div>
    </ModalLayout>
  );
};

export default PlayoffTournamentModal;
