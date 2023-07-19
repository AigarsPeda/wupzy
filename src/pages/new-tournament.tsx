import { type NextPage } from "next";
import NewTournamentForm from "~/components/elements/NewTournamentForm/NewTournamentForm";
import PageHead from "~/components/elements/PageHead/PageHead";
import PageHeadLine from "~/components/elements/PageHeadLine/PageHeadLine";

const NewTournamentPage: NextPage = () => {
  return (
    <>
      <PageHead
        title="Wupzy | New tournament"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <PageHeadLine title="Create new tournament" />
      <NewTournamentForm />
    </>
  );
};

export default NewTournamentPage;
