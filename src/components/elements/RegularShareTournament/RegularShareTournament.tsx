import { type FC } from "react";
import DisplayGames from "~/components/elements/DisplayGames/DisplayGames";
import DisplayGroupSelect from "~/components/elements/DisplayGroupSelect/DisplayGroupSelect";
import PlayerTable from "~/components/elements/PlayerTable/PlayerTable";
import TeamTable from "~/components/elements/TeamTable/TeamTable";
import {
  type GameType,
  type PlayerType,
  type TeamType,
  type TournamentTypeType,
} from "~/types/tournament.types";

interface RegularShareTournamentProps {
  groups: string[];
  games: GameType[];
  teams: TeamType[];
  isLoading: boolean;
  players: PlayerType[];
  selectedGroup: string;
  tournamentType: TournamentTypeType;
  setSelectedGroup: (group: string) => void;
}

const RegularShareTournament: FC<RegularShareTournamentProps> = ({
  games,
  teams,
  players,
  groups,
  isLoading,
  selectedGroup,
  tournamentType,
  setSelectedGroup,
}) => {
  return (
    <>
      <DisplayGroupSelect
        groups={groups}
        selectedGroup={selectedGroup}
        setSelectedGroup={setSelectedGroup}
      />
      <DisplayGames
        gamesScores={[]}
        isGamesLoading={isLoading}
        games={games?.filter((game) => game.group === selectedGroup)}
      />
      <div className="mt-5">
        {tournamentType === "king" ? (
          <PlayerTable selectedGroup={selectedGroup} players={players} />
        ) : (
          <TeamTable selectedGroup={selectedGroup} teams={teams} />
        )}
      </div>
    </>
  );
};

export default RegularShareTournament;
