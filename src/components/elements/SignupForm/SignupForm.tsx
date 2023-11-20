import { useState, type FC } from "react";
import { LuClipboardCopy } from "react-icons/lu";
import Bubble from "~/components/elements/Bubble/Bubble";
import Button from "~/components/elements/Button/Button";
import TournamentOptions from "~/components/elements/TournamentOptions/TournamentOptions";
import { env } from "~/env.mjs";
import useCreateTournament from "~/hooks/useCreateTournament";
import useRedirect from "~/hooks/useRedirect";
import { type SignupLinkType } from "~/types/signupLink.types";
import { api } from "~/utils/api";
import copyToClipboard from "~/utils/copyToClipboard";

interface SignupFormProps {
  signupLink: SignupLinkType;
}

const SignupForm: FC<SignupFormProps> = ({ signupLink }) => {
  const { redirectToPath } = useRedirect();
  const [isSuccessCopy, setIsSuccessCopy] = useState(false);
  const { newTournament, handleSetSelect, handleSetRounds } =
    useCreateTournament();

  const { mutate, isPending } =
    api.signupLink.postNewTournamentFromSignupLink.useMutation({
      onSuccess: (data) => {
        redirectToPath(`/tournaments/${data?.id}`);
      },
    });

  const isEnrolledListHasParticipants = () => {
    if (signupLink?.type === "king") {
      for (const player of newTournament.king.players) {
        if (player.name.trim() !== "") {
          return true;
        }
      }
    }

    if (signupLink?.type === "teams") {
      for (const team of newTournament.teams) {
        if (team.name?.trim() === "") {
          return false;
        }

        for (const player of team.players) {
          if (player.name.trim() === "") {
            return false;
          }
        }
      }
    }

    return true;
  };

  return (
    <div className="mx-auto max-w-lg rounded-md bg-white p-2 shadow md:mt-6">
      <div className="space-y-8">
        <div className="mt-4 border-b border-gray-900/10 pb-10">
          <fieldset>
            <legend className="text-base font-semibold leading-7 text-gray-900">
              Tournament name
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {signupLink?.name}
            </p>
          </fieldset>
          <fieldset className="mt-4">
            <legend className="text-base font-semibold leading-7 text-gray-900">
              Tournament kind
            </legend>
            <p className="mt-1 text-sm capitalize leading-6 text-gray-600">
              {signupLink?.type}
            </p>
          </fieldset>
          <fieldset className="mt-4">
            <legend className="text-base font-semibold leading-7 text-gray-900">
              Description
            </legend>
            <div
              className="mt-1 text-sm leading-6 text-gray-600"
              dangerouslySetInnerHTML={{ __html: signupLink?.description }}
            />
          </fieldset>
          <fieldset className="mt-4">
            <legend className="text-base font-semibold leading-7 text-gray-900">
              Link to share
            </legend>
            <div className="flex">
              <p className="mt-1 truncate text-sm leading-6 text-gray-600">
                {env.NEXT_PUBLIC_APP_DOMAIN}/signup/{signupLink?.slug}
              </p>
              <button
                className="relative items-center text-gray-600 hover:text-gray-900"
                onClick={() => {
                  copyToClipboard(
                    `${env.NEXT_PUBLIC_APP_DOMAIN}/signup/${signupLink?.slug}`,
                    () => {
                      setIsSuccessCopy(true);

                      setTimeout(() => {
                        setIsSuccessCopy(false);
                      }, 2000);
                    },
                  );
                }}
              >
                <LuClipboardCopy className="ml-3" />
                <Bubble
                  position="top-3"
                  message="Copied!"
                  isBubbleVisible={isSuccessCopy}
                />
              </button>
            </div>
          </fieldset>
        </div>

        <div className="mt-4 border-b border-gray-900/10 pb-10">
          <fieldset>
            <legend className="text-base font-semibold leading-7 text-gray-900">
              Enrolled {signupLink?.type === "teams" ? "teams" : "player"}:
            </legend>
            {!isEnrolledListHasParticipants() && (
              <p className="mt-1 text-sm leading-6 text-gray-600">
                No {signupLink?.type === "teams" ? "teams" : "player"} enrolled
              </p>
            )}
            {signupLink?.type === "teams"
              ? signupLink?.teams?.map((team) => {
                  return (
                    <div key={team.id}>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {team.name}
                      </p>
                    </div>
                  );
                })
              : signupLink?.players?.map((player) => {
                  return (
                    <div key={player.id}>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        {player.name}
                      </p>
                    </div>
                  );
                })}
          </fieldset>
        </div>

        <TournamentOptions
          sets={newTournament.sets}
          rounds={newTournament.rounds}
          handleSetRounds={handleSetRounds}
          handleSetSelect={handleSetSelect}
        />

        {signupLink?.isActive && (
          <div>
            <p className="text-sm text-gray-600">
              {/* The tournament will start when you click the button below. All{" "}
              {signupLink?.type === "teams" ? "teams" : "player"} enrolled will
              receive an email with the tournament details. */}
              All {signupLink?.type === "teams" ? "teams" : "player"} enrolled
              will automatically be added to the tournament, you can still add
              or remove participants after the tournament has started.
            </p>
            <div className="mt-5 flex items-center justify-end gap-x-6 pb-5">
              <div>
                <Button
                  size="sm"
                  type="button"
                  isLoading={isPending}
                  isDisabled={isPending}
                  title="Start tournament"
                  handleClick={() => {
                    if (!signupLink) {
                      return;
                    }
                    void mutate({
                      rounds: newTournament.rounds,
                      setCount: newTournament.sets,
                      signupLinkId: signupLink.id,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
