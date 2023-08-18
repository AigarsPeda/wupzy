import { useRouter } from "next/router";
import { useEffect, useState, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import PlayoffTeamSelect from "~/components/elements/PlayoffTeamSelect/PlayoffTeamSelect";
import PlayoffsTree from "~/components/elements/PlayoffsTree/PlayoffsTree";
import SetSelect from "~/components/elements/SetSelect/SetSelect";
import ModalLayout from "~/components/layout/ModalLayout/ModalLayout";
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
  const router = useRouter();
  const { teams, isFetched } = useTeams();
  const { refetch, tournament } = useTournament();
  const [playoffRounds, setPlayoffRounds] = useState<number[]>([]);
  const [selectedRoundsCount, setSelectedRoundsCount] = useState(0);
  const [playoffTree, setPlayoffTree] = useState<PlayoffMapType>(new Map());
  const { mutate, isLoading } = api.playoffs.createPlayoffGames.useMutation({
    onSuccess: async () => {
      await refetch();
      await router.replace({
        query: { ...router.query, isplayoffmode: true },
      });
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
    if (teams.length > 0) {
      const { playoffRounds, largestPossibleTeams } = createPlayoffRounds(
        teams.length
      );

      setPlayoffRounds(playoffRounds);
      selectedRoundsCount === 0 && setSelectedRoundsCount(largestPossibleTeams);
    }
  }, [selectedRoundsCount, teams]);

  useEffect(() => {
    if (selectedRoundsCount === 0) {
      return;
    }

    const playoffTree = formatTeamsToPlayoffTree(teams, selectedRoundsCount);
    const playoffMapKeys = Array.from(playoffTree.keys());

    if (playoffTree && playoffMapKeys.length > 1) {
      setPlayoffTree(playoffTree);
    }
  }, [isFetched, selectedRoundsCount, teams]);

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
          <PlayoffsTree
            playoffTree={playoffTree}
            displayTeamsComponent={({ team, isLast }) => {
              return <PlayoffTeamSelect isLast={isLast} team={team} />;
            }}
          />
        </div>
      </div>
    </ModalLayout>
  );
};

export default PlayoffTournamentModal;
