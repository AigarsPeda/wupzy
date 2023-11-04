import { type FC } from "react";
import DisplayGames from "~/components/elements/DisplayGames/DisplayGames";
import PlayerTable from "~/components/elements/PlayerTable/PlayerTable";
import TeamTable from "~/components/elements/TeamTable/TeamTable";
import usePlayers from "~/hooks/usePlayers";
import useTeams from "~/hooks/useTeams";
import useTournamentGames from "~/hooks/useTournamentGames";

interface RegularTournamentProps {
  selectedGroup: string;
  tournamentType: "king" | "teams";
  updateSelectedGroup: (value: string) => void;
}

const RegularTournament: FC<RegularTournamentProps> = ({
  selectedGroup,
  tournamentType,
  updateSelectedGroup,
}) => {
  const {
    games,
    groups,
    isLoading,
    gamesScores,
    handleScoreSave,
    handleScoreChange,
  } = useTournamentGames();
  const { teams } = useTeams();
  const { players } = usePlayers();

  return (
    <>
      {/* <DisplayGroupSelect
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={updateSelectedGroup}
      /> */}

      <DisplayGames
        gamesScores={gamesScores}
        isGamesLoading={isLoading}
        handleScoreSave={handleScoreSave}
        handleScoreChange={handleScoreChange}
        games={games?.filter((game) => game.group === selectedGroup) || []}
      />

      <div className="mt-5 ">
        {tournamentType === "king" ? (
          <PlayerTable selectedGroup={selectedGroup} players={players || []} />
        ) : (
          <TeamTable selectedGroup={selectedGroup} teams={teams || []} />
        )}
      </div>
    </>
  );
};

export default RegularTournament;
