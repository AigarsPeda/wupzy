import { useState, type FC } from "react";
import Button from "~/components/elements/Button/Button";
import Input from "~/components/elements/Input/Input";
import NewKingTournament from "~/components/elements/NewKingTournament/NewKingTournament";
import {
  type AddPlayerToTeamType,
  type HandleInputChangeType,
  type HandleTeamsPlayerNameUpdateType,
} from "~/components/elements/NewKingTournament/NewKingTournamentUtils/types";
import NewTeamsTournament from "~/components/elements/NewTeamsTournament/NewTeamsTournament";
import RadioSelect from "~/components/elements/RadioSelect/RadioSelect";
import {
  type NewPlayerType,
  type NewTeamsType,
  type NewTournamentType,
} from "~/types/tournament.types";
import validatedTournamentKing from "~/utils/validatedTournamentKing";

const NewTournamentForm: FC = () => {
  const [newTournament, setNewTournament] = useState<NewTournamentType>({
    name: "",
    kind: "king",
    king: {
      players: [
        {
          id: 1,
          name: "",
        },
        {
          id: 2,
          name: "",
        },
        {
          id: 3,
          name: "",
        },
      ],
    },
    teams: [
      {
        id: 1,
        name: "",
        players: [
          {
            id: 1,
            name: "",
          },
          {
            id: 2,
            name: "",
          },
        ],
      },
      {
        id: 2,
        name: "",
        players: [
          {
            id: 1,
            name: "",
          },
          {
            id: 2,
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
      id: newTournament.king.players.length + 1,
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
      id: newTournament.teams.length + 1,
      name: "",
      players: [
        {
          id: 1,
          name: "",
        },
        {
          id: 2,
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
          id: team.players.length + 1,
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

  return (
    <form
      className="mx-auto mt-4 max-w-lg rounded bg-white p-2 md:mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        console.log("newTournament", newTournament);
      }}
    >
      <div className="space-y-10">
        <div className="mt-4 border-b border-gray-900/10 pb-12">
          <legend className="text-base font-semibold leading-7 text-gray-900">
            Tournaments name
          </legend>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Input
                inputLabel=""
                inputFor="Tournaments Name"
                inputVal={newTournament.name}
                handleInputChange={(str) => {
                  setNewTournament({ ...newTournament, name: str });
                }}
              />
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <fieldset>
            <legend className="text-base font-semibold leading-7 text-gray-900">
              Tournament kind
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Select the type of tournament you wish to create.
            </p>
            <div className="mt-6 space-y-6">
              <RadioSelect
                radioTitle="King"
                radioValue="king"
                radioName="tournament-kind"
                radioSelectedValue={newTournament.kind}
                handleRadioChange={(str) => {
                  const kind = validatedTournamentKing(str);
                  setNewTournament({ ...newTournament, kind });
                }}
              />
              <RadioSelect
                radioTitle="Teams"
                radioValue="teams"
                radioName="tournament-kind"
                radioSelectedValue={newTournament.kind}
                handleRadioChange={(str) => {
                  const kind = validatedTournamentKing(str);
                  setNewTournament({ ...newTournament, kind });
                }}
              />
            </div>
          </fieldset>
        </div>

        <div className="relative overflow-hidden border-b border-gray-900/10 pb-12">
          <NewKingTournament
            handleAddPlayer={handleAddPlayer}
            players={newTournament.king.players}
            isVisible={newTournament.kind === "king"}
            handleKingsPlayerName={updateKingsPlayerName}
          />

          <NewTeamsTournament
            teams={newTournament.teams}
            handleAddTeam={handleAddTeam}
            addPlayerToTeam={addPlayerToTeam}
            updateTeamsTeamName={updateTeamsTeamName}
            isVisible={newTournament.kind === "teams"}
            updateTeamsPlayerName={updateTeamsPlayerName}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <Button
          size="sm"
          title="Save"
          type="submit"
          handleClick={() => {
            console.log("clicked", newTournament);
          }}
        />
      </div>
    </form>
  );
};

export default NewTournamentForm;
