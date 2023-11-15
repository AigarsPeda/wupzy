import { type FC } from "react";
import Button from "~/components/elements/Button/Button";
import TournamentOptions from "~/components/elements/TournamentOptions/TournamentOptions";
import { env } from "~/env.mjs";
import useCreateTournament from "~/hooks/useCreateTournament";
import useRedirect from "~/hooks/useRedirect";
import { type SignupLinkType } from "~/types/signupLink.types";
import { api } from "~/utils/api";

interface SignupFormProps {
  signupLink: SignupLinkType;
}

const SignupForm: FC<SignupFormProps> = ({ signupLink }) => {
  const { redirectToPath } = useRedirect();
  const { newTournament, handleSetSelect, handleSetRounds } =
    useCreateTournament();

  const { mutate, isPending } =
    api.signupLink.postNewTournamentFromSignupLink.useMutation({
      onSuccess: (data) => {
        redirectToPath(`/tournaments/${data?.id}`);
      },
    });

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
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {signupLink?.description}
            </p>
          </fieldset>
          <fieldset className="mt-4">
            <legend className="text-base font-semibold leading-7 text-gray-900">
              Link to share
            </legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              {env.NEXT_PUBLIC_APP_DOMAIN}/signup/{signupLink?.slug}
            </p>
          </fieldset>
        </div>

        <div className="mt-4 border-b border-gray-900/10 pb-10">
          <fieldset>
            <legend className="text-base font-semibold leading-7 text-gray-900">
              Enrolled {signupLink?.type === "teams" ? "teams" : "player"}:
            </legend>
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
          <div className="mt-2 flex items-center justify-end gap-x-6 pb-5">
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
        )}
      </div>
    </div>
  );
};

export default SignupForm;
