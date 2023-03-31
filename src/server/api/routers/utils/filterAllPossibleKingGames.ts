import type { ParticipantType } from "types/team.types";

type ParticipantObjType = {
  first: {
    id: string;
  }[];
  second: {
    id: string;
  }[];
};

const filterAllPossibleKingGames = (
  participants: ParticipantType,
  games: ParticipantObjType[]
) => {
  const filteredGames = games.filter((game) => {
    const isInFirst = game.first.some(
      (participant) => participant.id === participants.id
    );
    const isInSecond = game.second.some(
      (participant) => participant.id === participants.id
    );

    return isInFirst || isInSecond;
  });

  return filteredGames;
};

export default filterAllPossibleKingGames;
