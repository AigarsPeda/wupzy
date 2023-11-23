import { ONE_TOURNAMENT_COST } from "hardcoded";
import { type FC } from "react";
import Button from "~/components/elements/Button/Button";
import TextButton from "~/components/elements/TextButton/TextButton";
import SmallModalLayout from "~/components/layout/SmallModalLayout/SmallModalLayout";
import useRedirect from "~/hooks/useRedirect";
import { type TournamentTypeType } from "~/types/tournament.types";
import { api } from "~/utils/api";

interface SignupLinkModalProps {
  name: string;
  isVisible: boolean;
  description: string;
  isCreditsEnough: boolean;
  tournamentKind: TournamentTypeType;
  handleCancelClick: () => void;
}

const SignupLinkModal: FC<SignupLinkModalProps> = ({
  name,
  isVisible,
  description,
  tournamentKind,
  isCreditsEnough,
  handleCancelClick,
}) => {
  const { redirectToPath } = useRedirect();

  const { mutate: postSignupLink, isPending } =
    api.signupLink.postSignupLink.useMutation({
      onSuccess: (data) => {
        redirectToPath(`/signups/${data.signupLink.id}`);
      },
    });

  return (
    <SmallModalLayout
      modalTitle=""
      isModalVisible={isVisible}
      handleCancelClick={handleCancelClick}
    >
      <div className="w-[90vw] space-y-10 px-3 pb-2 text-left md:w-[38rem] md:px-6 md:pb-4">
        <div>
          <legend className="text-base font-semibold leading-7 text-gray-900">
            Name
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">{name}</p>
        </div>
        <div>
          <legend className="text-base font-semibold leading-7 text-gray-900">
            Tournament kind
          </legend>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {tournamentKind}
          </p>
        </div>
        <div>
          <legend className="text-base font-semibold leading-7 text-gray-900">
            Description
          </legend>
          {description === "" ? (
            <p className="mt-1 text-sm leading-6 text-gray-600">
              No description
            </p>
          ) : (
            <div
              className="mt-1 max-h-96 overflow-y-auto text-sm leading-6 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            />
          )}
        </div>
        <div className="text-xs"></div>
        <div>
          <div className="flex justify-center">
            <p className="mb-2 text-xs">
              <span className="font-semibold">This is pro feature.</span> You
              need to have {ONE_TOURNAMENT_COST} credits to create signup link.
              When you create tournament you will get all pro features enabled.
            </p>
          </div>
          <div className="flex w-full items-center justify-end gap-x-6">
            <TextButton title="Cancel" handleClick={handleCancelClick} />

            <div className="w-20">
              <Button
                size="sm"
                type="button"
                title="Create"
                isLoading={isPending}
                isDisabled={name.trim() === "" || !isCreditsEnough}
                handleClick={() => {
                  postSignupLink({
                    name: name,
                    description: description,
                    tournamentKind: tournamentKind,
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </SmallModalLayout>
  );
};

export default SignupLinkModal;
