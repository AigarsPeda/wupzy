import { useState } from "react";
import {
  type AddPlayerToTeamType,
  type HandleInputChangeType,
  type HandleTeamsPlayerNameUpdateType,
} from "~/components/elements/NewKingTournament/NewKingTournamentUtils/types";
import {
  type NewPlayerType,
  type NewTeamsType,
  type NewTournamentType,
} from "~/types/tournament.types";
import validatedTournamentKing from "~/utils/validatedTournamentKing";

const useCreateNewTournament = () => {
  const [newTournament, setNewTournament] = useState<NewTournamentType>({
    sets: 1,
    name: "",
    rounds: 1,
    kind: "king",
    king: {
      players: [
        {
          id: "1",
          name: "",
        },
        {
          id: "2",
          name: "",
        },
        {
          id: "3",
          name: "",
        },
      ],
    },
    teams: [
      {
        id: "1",
        name: "",
        players: [
          {
            id: "1",
            name: "",
          },
          {
            id: "2",
            name: "",
          },
        ],
      },
      {
        id: "2",
        name: "",
        players: [
          {
            id: "1",
            name: "",
          },
          {
            id: "2",
            name: "",
          },
        ],
      },
    ],
  });

  const updateKingsPlayerName = ({ id, name }: HandleInputChangeType) => {
    const players = newTournament.king.players.map((player) => {
      if (player.id === id) {
        return {
          ...player,
          name,
        };
      }
      return player;
    });

    setNewTournament({
      ...newTournament,
      king: {
        ...newTournament.king,
        players,
      },
    });
  };

  const handleAddPlayer = () => {
    const newPlayer: NewPlayerType = {
      id: (newTournament.king.players.length + 1).toString(),
      name: "",
    };
    setNewTournament({
      ...newTournament,
      king: {
        ...newTournament.king,
        players: [...newTournament.king.players, newPlayer],
      },
    });
  };

  const handleAddTeam = () => {
    const newTeam: NewTeamsType = {
      id: (newTournament.teams.length + 1).toString(),
      name: "",
      players: [
        {
          id: "1",
          name: "",
        },
        {
          id: "2",
          name: "",
        },
      ],
    };
    setNewTournament({
      ...newTournament,
      teams: [...newTournament.teams, newTeam],
    });
  };

  const updateTeamsTeamName = ({ id, name }: HandleInputChangeType) => {
    const teams = newTournament.teams.map((team) => {
      if (team.id === id) {
        return {
          ...team,
          name,
        };
      }
      return team;
    });

    setNewTournament({
      ...newTournament,
      teams,
    });
  };

  const updateTeamsPlayerName = ({
    id,
    name,
    teamId,
  }: HandleTeamsPlayerNameUpdateType) => {
    const teams = newTournament.teams.map((team) => {
      if (team.id === teamId) {
        const players = team.players.map((player) => {
          if (player.id === id) {
            return {
              ...player,
              name,
            };
          }
          return player;
        });
        return {
          ...team,
          players,
        };
      }
      return team;
    });

    setNewTournament({
      ...newTournament,
      teams,
    });
  };

  const addPlayerToTeam = ({ teamId }: AddPlayerToTeamType) => {
    const teams = newTournament.teams.map((team) => {
      if (team.id === teamId) {
        const newPlayer: NewPlayerType = {
          id: (team.players.length + 1).toString(),
          name: "",
        };
        return {
          ...team,
          players: [...team.players, newPlayer],
        };
      }
      return team;
    });

    setNewTournament({
      ...newTournament,
      teams,
    });
  };

  const changeTournamentKind = (str: string) => {
    const kind = validatedTournamentKing(str);
    setNewTournament({
      ...newTournament,
      kind,
    });
  };

  const changeTournamentName = (name: string) => {
    setNewTournament({
      ...newTournament,
      name,
    });
  };

  const handleSetSelect = (sets: number) => {
    setNewTournament({
      ...newTournament,
      sets,
    });
  };

  const handleSetRounds = (rounds: number) => {
    setNewTournament({
      ...newTournament,
      rounds,
    });
  };

  return {
    newTournament,
    handleAddTeam,
    handleAddPlayer,
    addPlayerToTeam,
    handleSetSelect,
    handleSetRounds,
    updateTeamsTeamName,
    changeTournamentKind,
    changeTournamentName,
    updateKingsPlayerName,
    updateTeamsPlayerName,
  };
};

export default useCreateNewTournament;
