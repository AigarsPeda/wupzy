import { ONE_TOURNAMENT_COST } from "hardcoded";
import { type NextPage } from "next";
import { useState } from "react";
import NewSignupLinkForm from "~/components/elements/NewSignupLinkForm/NewSignupLinkForm";
import PageHead from "~/components/elements/PageHead/PageHead";
import useCreateTournament from "~/hooks/useCreateTournament";
import useRedirect from "~/hooks/useRedirect";
import useUser from "~/hooks/useUser";
import { api } from "~/utils/api";

const NewSignupLinkPage: NextPage = () => {
  const { user } = useUser();
  const { redirectToPath } = useRedirect();
  const [editorState, setEditorState] = useState("");
  const { newTournament, changeTournamentName, changeTournamentKind } =
    useCreateTournament();

  const { mutate: postSignupLink, isPending } =
    api.signupLink.postSignupLink.useMutation({
      onSuccess: (data) => {
        redirectToPath(`/signups/${data.signupLink.id}`);
      },
    });

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
      {/* <SignupLinkModal /> */}
      <main>
        <NewSignupLinkForm
          isPending={isPending}
          tournament={newTournament}
          isCreditsEnough={isCreditsEnough}
          handleGetEditorContent={setEditorState}
          changeTournamentName={changeTournamentName}
          changeTournamentKind={changeTournamentKind}
          postSignupLink={() => {
            postSignupLink({
              name: newTournament.name,
              description: editorState,
              tournamentKind: newTournament.kind,
            });
          }}
        />
      </main>
    </>
  );
};

export default NewSignupLinkPage;
