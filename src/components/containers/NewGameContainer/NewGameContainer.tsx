import Button from "components/elements/Button/Button";
import ErrorMessage from "components/elements/ErrorMessage/ErrorMessage";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import ProgressBar from "components/elements/ProgressBar/ProgressBar";
import TournamentAttendantForm from "components/elements/TournamentAttendantForm/TournamentAttendantForm";
import TournamentCreateMetaForm from "components/elements/TournamentCreateMetaForm/TournamentCreateMetaForm";
import TournamentCreateReview from "components/elements/TournamentCreateReview/TournamentCreateReview";
import { DEFAULT_ATTENDANTS_COUNT } from "hardcoded";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import type {
  TeamsAttendantMapType,
  TeamsAttendantType,
} from "types/team.types";
import { api } from "utils/api";
import createStringArrayFromNumber from "utils/createStringArrayFromNumber";

const FORM_STEPS = ["Create tournament", "Add tournament attendant", "Review"];

const NewTournamentContainer: FC = () => {
  const router = useRouter();
  const [isKing, setIsKing] = useState(true);
  const [formStep, setFormStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentName, setTournamentName] = useState("");
  const [teamsAttendants, setTeamsAttendants] = useState<TeamsAttendantMapType>(
    new Map()
  );
  const [kingAttendants, setKingAttendants] = useState<string[]>(
    createStringArrayFromNumber(DEFAULT_ATTENDANTS_COUNT)
  );
  const { mutateAsync, isLoading, isError } =
    api.tournaments.createKingTournament.useMutation();

  const isFirstStep = formStep === 0;
  const isLastStep = formStep === FORM_STEPS.length - 1;
  const progress = Math.round((formStep / (FORM_STEPS.length - 1)) * 100);

  const addNewAttendant = () => {
    setKingAttendants((state) => [...state, ""]);
  };

  const createTeam = (name: string, participants: TeamsAttendantType[]) => {
    setTeamsAttendants((state) => {
      const newState = new Map(state);
      newState.set(name, participants);
      return newState;
    });
  };

  const deleteTeam = (name: string) => {
    setTeamsAttendants((state) => {
      const newState = new Map(state);
      newState.delete(name);
      return newState;
    });
  };

  // TODO: add modes king or teams FUNCTION

  const createTournament = async () => {
    const tournament = await mutateAsync({
      name: tournamentName,
      attendants: kingAttendants,
    });

    if (!tournament) {
      console.error("error creating tournament");
      return;
    }

    setFormStep(0);
    setIsModalOpen(false);
    setTournamentName("");
    setKingAttendants(createStringArrayFromNumber(DEFAULT_ATTENDANTS_COUNT));
    router.push(`/tournaments/${tournament.tournament.id}`).catch(() => {
      console.error("error changing route");
    });
  };

  const handleTeamsAttendantsUpdate = (
    oldName: string,
    newName: string,
    participants: TeamsAttendantType[]
  ) => {
    setTeamsAttendants((state) => {
      const newState = new Map(state);
      newState.delete(oldName);
      newState.set(newName, participants);
      return newState;
    });
  };

  const isNextStepDisabled = () => {
    if (formStep === 0) {
      return tournamentName.length === 0;
    }

    if (formStep === 1) {
      const isKingAttendantsEmpty = kingAttendants.some(
        (attendant) => attendant.length === 0
      );

      const isTeamsLessThanFour = [...teamsAttendants.keys()].length < 4;

      if (!isKingAttendantsEmpty || !isTeamsLessThanFour) {
        return false;
      }
    }

    return true;
  };

  return (
    <>
      <Button
        btnColor="outline"
        btnTitle={<span className="px-3 text-sm">New tournament</span>}
        onClick={() => {
          setIsModalOpen((state) => !state);
        }}
      />
      <ModalWrap
        modalWidth="xl"
        isModalVisible={isModalOpen}
        modalTitle="Crete new tournament"
        handleCancelClick={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="h-[30rem]">
          {(() => {
            switch (formStep) {
              case 0:
                return (
                  <TournamentCreateMetaForm
                    isKing={isKing}
                    tournamentName={tournamentName}
                    setTournamentName={setTournamentName}
                    handleModeSwitch={() => {
                      setIsKing((state) => !state);
                    }}
                  />
                );

              case 1:
                return (
                  <TournamentAttendantForm
                    isKing={isKing}
                    createTeam={createTeam}
                    deleteTeam={deleteTeam}
                    kingAttendants={kingAttendants}
                    teamsAttendants={teamsAttendants}
                    addNewAttendant={addNewAttendant}
                    setKingAttendants={setKingAttendants}
                    handleTeamsAttendantsUpdate={handleTeamsAttendantsUpdate}
                  />
                );

              case 2:
                return (
                  <TournamentCreateReview
                    attendants={kingAttendants}
                    tournamentName={tournamentName}
                  />
                );

              default:
                return <p>Error</p>;
            }
          })()}
        </div>

        <div className="my-6 w-full">
          {isError ? (
            <div className="flex w-full justify-center">
              <ErrorMessage message="Something went wrong! Please tray again." />
            </div>
          ) : (
            <ProgressBar progress={progress !== 0 ? progress : 5} />
          )}
        </div>

        <div className="flex w-full justify-between">
          <Button
            btnColor="outline"
            btnTitle="Previous"
            isDisabled={isFirstStep}
            onClick={() => {
              if (isFirstStep) {
                return;
              }

              setFormStep((state) => state - 1);
            }}
          />
          <Button
            isLoading={isLoading}
            isDisabled={isNextStepDisabled()}
            btnTitle={isLastStep ? "Create" : "Next"}
            onClick={() => {
              if (isLastStep) {
                createTournament().catch(() => {
                  console.error("Error creating tournament");
                });
                return;
              }

              setFormStep((state) => state + 1);
            }}
          />
        </div>
      </ModalWrap>
    </>
  );
};

export default NewTournamentContainer;
