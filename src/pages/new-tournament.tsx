import { type NextPage } from "next";
import NewTournamentForm from "~/components/elements/NewTournamentForm/NewTournamentForm";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";

const NewTournamentPage: NextPage = () => {
  return (
    <div>
      <PageHeadLine title="Create new tournament" />
      <NewTournamentForm />
    </div>
  );
};

export default NewTournamentPage;
