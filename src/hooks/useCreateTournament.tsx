import { useCallback, useState } from "react";
import {
  type AddPlayerToTeamType,
  type HandleInputChangeType,
  type HandleTeamsPlayerNameUpdateType,
} from "~/components/elements/NewKingTournament/NewKingTournamentUtils/types";
import {
  NewPlayerSchema,
  type KeyNewPlayerType,
  type NewPlayerType,
  type NewTeamsType,
  type NewTournamentType,
  type PlayerType,
  type TeamType,
  type TournamentTypeType,
} from "~/types/tournament.types";
import validatedTournamentKing from "~/utils/validatedTournamentKing";

const useCreateTournament = () => {
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
          group: "A",
        },
        {
          id: "2",
          name: "",
          group: "A",
        },
        {
          id: "3",
          name: "",
          group: "A",
        },
        {
          id: "4",
          name: "",
          group: "A",
        },
      ],
    },
    teams: [
      {
        id: "1",
        name: "",
        group: "A",
        players: [
          {
            id: "1",
            name: "",
            group: "A",
          },
          {
            id: "2",
            name: "",
            group: "A",
          },
        ],
      },
      {
        id: "2",
        name: "",
        group: "A",
        players: [
          {
            id: "1",
            name: "",
            group: "A",
          },
          {
            id: "2",
            name: "",
            group: "A",
          },
        ],
      },
    ],
  });

  const loadTournament = useCallback(
    ({
      teams,
      players,
      tournament,
    }: {
      teams: TeamType[];
      players: PlayerType[];
      tournament: {
        id: string;
        name: string;
        sets: number;
        rounds: number;
        type: TournamentTypeType;
      };
    }) => {
      setNewTournament((state) => ({
        ...state,
        name: tournament.name,
        sets: tournament.sets,
        kind: tournament.type,
        rounds: tournament.rounds,
        king: {
          ...state.king,
          players: players.map((player) => ({
            id: player.id,
            name: player.name,
            group: player.group,
            ...(player.email && { email: player.email }),
            ...(player.phone && { phone: player.phone }),
          })),
        },

        teams: teams.map((team) => ({
          id: team.id,
          name: team.name,
          group: team.group,

          players: team.players.map((player) => ({
            id: player.id,
            name: player.name,
            group: player.group,
          })),
        })),
      }));
    },
    [],
  );

  const addFieldToPlayer = ({
    id,
    field,
  }: {
    id: string;
    field: KeyNewPlayerType;
  }) => {
    const players = newTournament.king.players.map((player) => {
      if (player.id === id) {
        return {
          ...player,
          [field]: "",
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

  const removeFieldFromPlayer = ({
    id,
    field,
  }: {
    id: string;
    field: KeyNewPlayerType;
  }) => {
    const players = newTournament.king.players.map((player) => {
      if (player.id === id) {
        // const { [field]: _val, ...rest } = player;
        // const validRest = NewPlayerSchema.parse(rest);
        // return validRest;

        // deep copy object
        const newPlayer = NewPlayerSchema.parse(
          JSON.parse(JSON.stringify(player)),
        );

        // delete property from object
        delete newPlayer[field];

        // return new object
        return newPlayer;
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

  const updateKingsPlayerName = ({ id, key, value }: HandleInputChangeType) => {
    const players = newTournament.king.players.map((player) => {
      if (player.id === id) {
        return {
          ...player,
          [key]: value,
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
      group: "A",
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
      group: "A",
      players: [
        {
          id: "1",
          name: "",
          group: "A",
        },
        {
          id: "2",
          name: "",
          group: "A",
        },
      ],
    };
    setNewTournament({
      ...newTournament,
      teams: [...newTournament.teams, newTeam],
    });
  };

  const updateTeamsTeamName = ({ id, key, value }: HandleInputChangeType) => {
    const teams = newTournament.teams.map((team) => {
      if (team.id === id) {
        return {
          ...team,
          [key]: value,
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
          group: "A",
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
    loadTournament,
    handleAddPlayer,
    addPlayerToTeam,
    handleSetSelect,
    handleSetRounds,
    addFieldToPlayer,
    updateTeamsTeamName,
    changeTournamentKind,
    changeTournamentName,
    updateKingsPlayerName,
    updateTeamsPlayerName,
    removeFieldFromPlayer,
  };
};

export default useCreateTournament;
