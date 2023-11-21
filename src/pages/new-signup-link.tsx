import { ONE_TOURNAMENT_COST } from "hardcoded";
import { type NextPage } from "next";
import { useState } from "react";
import Button from "~/components/elements/Button/Button";
import Input from "~/components/elements/Input/Input";
import PageHead from "~/components/elements/PageHead/PageHead";
import RadioSelect from "~/components/elements/RadioSelect/RadioSelect";
import TextButton from "~/components/elements/TextButton/TextButton";
import TextEditor from "~/components/elements/TextEditor/TextEditor";
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
      <main>
        <form
          id="new-signup-link"
          name="new-tournament"
          className="mx-auto max-w-lg rounded-md bg-white p-2 shadow md:mt-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="space-y-10">
            <p className="mt-1 text-xs text-gray-600">
              * This is pro feature. You need to have credits to create signup
              link.
            </p>
            <div className="mt-2 border-b border-gray-900/10 pb-12">
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Signup link name
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Name is used to identify your tournament. It will be visible to
                all participants.
              </p>
              <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <Input
                    inputLabel=""
                    inputFor="Signup link name"
                    inputVal={newTournament.name}
                    handleInputChange={changeTournamentName}
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
                    handleRadioChange={changeTournamentKind}
                  />
                  <RadioSelect
                    radioTitle="Teams"
                    radioValue="teams"
                    radioName="tournament-kind"
                    radioSelectedValue={newTournament.kind}
                    handleRadioChange={changeTournamentKind}
                  />
                </div>
              </fieldset>
            </div>
            <fieldset>
              <legend className="text-base font-semibold leading-7 text-gray-900">
                Description
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Write a short description of your tournament. Place, date, time,
                etc.
              </p>
              <div className="mt-6 space-y-6">
                <TextEditor handleGetEditorContent={setEditorState} />
              </div>
            </fieldset>
          </div>

          <div className="mt-6">
            {!isCreditsEnough && (
              <div className="mb-3 flex justify-end">
                <p className="text-sm text-red-600">
                  You need to have at least {ONE_TOURNAMENT_COST} credits to
                  create a link.
                </p>
              </div>
            )}
            <div className="flex items-center justify-end gap-x-6">
              <TextButton
                title="Cancel"
                handleClick={() => redirectToPath("/tournaments")}
              />

              <div className="w-20">
                <Button
                  size="sm"
                  type="button"
                  title="Create"
                  isLoading={isPending}
                  handleClick={() => {
                    postSignupLink({
                      name: newTournament.name,
                      description: editorState,
                      tournamentKind: newTournament.kind,
                    });
                  }}
                  isDisabled={
                    newTournament.name.trim() === "" || !isCreditsEnough
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </main>
    </>
  );
};

export default NewSignupLinkPage;
