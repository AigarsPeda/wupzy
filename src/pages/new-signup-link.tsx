import { ONE_TOURNAMENT_COST } from "hardcoded";
import { type NextPage } from "next";
import { useState } from "react";
import NewSignupLinkForm from "~/components/elements/NewSignupLinkForm/NewSignupLinkForm";
import PageHead from "~/components/elements/PageHead/PageHead";
import useCreateTournament from "~/hooks/useCreateTournament";
import useUser from "~/hooks/useUser";
import dynamic from "next/dynamic";

const SignupLinkModal = dynamic(
  () => import("~/components/elements/SignupLinkModal/SignupLinkModal"),
);

const NewSignupLinkPage: NextPage = () => {
  const { user } = useUser();
  const [isSubmit, setIsSubmit] = useState(false);
  const [editorState, setEditorState] = useState("");
  const { newTournament, changeTournamentName, changeTournamentKind } =
    useCreateTournament();

  const isCreditsEnough = (user?.credits || 0) >= ONE_TOURNAMENT_COST;

  return (
    <>
      <PageHead
        title="Wupzy | New signup link"
        descriptionShort="Platform that lets you effortlessly organize and manage tournament."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <SignupLinkModal
        isVisible={isSubmit}
        name={newTournament.name}
        description={editorState}
        isCreditsEnough={isCreditsEnough}
        tournamentKind={newTournament.kind}
        handleCancelClick={() => {
          setIsSubmit(false);
        }}
      />
      <main>
        <NewSignupLinkForm
          tournament={newTournament}
          isCreditsEnough={isCreditsEnough}
          handleGetEditorContent={setEditorState}
          changeTournamentName={changeTournamentName}
          changeTournamentKind={changeTournamentKind}
          startPostSignupLink={() => {
            setIsSubmit(true);
          }}
        />
      </main>
    </>
  );
};

export default NewSignupLinkPage;
