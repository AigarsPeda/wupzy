import { NewTournamentSchema } from "~/types/tournament.types";

const validatedTournamentKing = (str: string) => {
  return NewTournamentSchema.pick({ kind: true }).parse({ kind: str }).kind;
};

export default validatedTournamentKing;
