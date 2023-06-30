import { type PlayerType } from "~/types/tournament.types";
import { type PlayersMapType } from "~/types/utils.types";

type ChangePlatersGroupArgs = {
  group: string;
  player: PlayerType;
  playersByGroup: PlayersMapType;
};

const changePlayersGroup = ({
  group,
  player,
  playersByGroup,
}: ChangePlatersGroupArgs) => {
  const newPlayersByGroup = new Map(playersByGroup);
  const newPlayers = newPlayersByGroup.get(player.group) || [];
  const newPlayersInGroup = newPlayers.filter((t) => t.id !== player.id);
  newPlayersByGroup.set(player.group, newPlayersInGroup);
  const newTeamsInNewGroup = newPlayersByGroup.get(group) || [];
  newTeamsInNewGroup.push({
    ...player,
    group,
  });
  newPlayersByGroup.set(group, newTeamsInNewGroup);
  return newPlayersByGroup;
};

export default changePlayersGroup;
