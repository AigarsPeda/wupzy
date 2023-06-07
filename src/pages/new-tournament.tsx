import { type NextPage } from "next";
import NewTournamentForm from "../components/elements/NewTournamentForm/NewTournamentForm";

const NewTournamentPage: NextPage = () => {
  return (
    <div>
      <h1 className="text-3xl">Create new tournament</h1>
      <NewTournamentForm />
    </div>
  );
};

export default NewTournamentPage;
