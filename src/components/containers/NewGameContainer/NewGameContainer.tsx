import { useAutoAnimate } from "@formkit/auto-animate/react";
import Button from "components/elements/Button/Button";
import ErrorMessage from "components/elements/ErrorMessage/ErrorMessage";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import ProgressBar from "components/elements/ProgressBar/ProgressBar";
import TournamentAttendantForm from "components/elements/TournamentAttendantForm/TournamentAttendantForm";
import TournamentCreateMetaForm from "components/elements/TournamentCreateMetaForm/TournamentCreateMetaForm";
import TournamentCreateReview from "components/elements/TournamentCreateReview/TournamentCreateReview";
import { DEFAULT_ATTENDANTS_COUNT, DEFAULT_TEAM_COUNT } from "hardcoded";
import useWindowSize from "hooks/useWindowSize";
import { useRouter } from "next/router";
import type { FC } from "react";
import { useState } from "react";
import type {
  TeamsAttendantMapType,
  TeamsAttendantType,
} from "types/team.types";
import type { TournamentType } from "types/tournament.types";
import { api } from "utils/api";
import createStringArrayFromNumber from "utils/createStringArrayFromNumber";

const FORM_STEPS = ["Create tournament", "Add tournament attendant", "Review"];

const NewTournamentContainer: FC = () => {
  const router = useRouter();
  const [parent] = useAutoAnimate();
  const { windowSize } = useWindowSize();
  const [isKing, setIsKing] = useState(true);
  const [formStep, setFormStep] = useState(0);
  const [gameSetCount, setGameSetCount] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentName, setTournamentName] = useState("");
  const [teamsAttendants, setTeamsAttendants] = useState<TeamsAttendantMapType>(
    new Map()
  );
  const [kingAttendants, setKingAttendants] = useState<string[]>(
    createStringArrayFromNumber(DEFAULT_ATTENDANTS_COUNT)
  );
  const {
    mutateAsync: createKingTournament,
    isLoading,
    isError,
  } = api.kingTournaments.createKingTournament.useMutation();

  const { mutateAsync: createTeamsTournament } =
    api.teamsTournaments.createTeamsTournament.useMutation();

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

  const createTournament = async () => {
    let cratedTournament: TournamentType | null = null;

    if (isKing) {
      const { tournament } = await createKingTournament({
        name: tournamentName,
        attendants: kingAttendants.filter(Boolean),
      });

      cratedTournament = tournament;
    }

    if (!isKing) {
      const { tournament } = await createTeamsTournament({
        gameSetCount,
        name: tournamentName,
        teams: teamsAttendants,
      });

      cratedTournament = tournament;
    }

    if (!cratedTournament) {
      console.error("error creating tournament");
      return;
    }

    setFormStep(0);
    setIsKing(true);
    setIsModalOpen(false);
    setTournamentName("");
    setTeamsAttendants(new Map());
    setKingAttendants(createStringArrayFromNumber(DEFAULT_ATTENDANTS_COUNT));
    router.push(`/tournaments/${cratedTournament.id}`).catch(() => {
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
      const isKingAttendantsLessThanFour =
        kingAttendants.filter(Boolean).length < DEFAULT_ATTENDANTS_COUNT;

      const isTeamsLessThanFour =
        [...teamsAttendants.keys()].length < DEFAULT_TEAM_COUNT;

      if (!isKingAttendantsLessThanFour || !isTeamsLessThanFour) {
        return false;
      }

      return true;
    }

    return false;
  };

  return (
    <>
      <Button
        btnColor="outline"
        btnTitle={
          windowSize.width >= 500 ? (
            <span className="px-3 text-sm">New tournament</span>
          ) : (
            <span className="px-3 text-sm">New</span>
          )
        }
        onClick={() => {
          setIsModalOpen((state) => !state);
        }}
      />
      <ModalWrap
        modalWidth="2xl"
        isModalVisible={isModalOpen}
        modalTitle="Crete new tournament"
        handleCancelClick={() => {
          setFormStep(0);
          setIsKing(true);
          setIsModalOpen(false);
          setTournamentName("");
          setTeamsAttendants(new Map());
          setKingAttendants(
            createStringArrayFromNumber(DEFAULT_ATTENDANTS_COUNT)
          );
        }}
      >
        <div
          ref={parent}
          style={{
            height: windowSize.height - 300,
          }}
        >
          {(() => {
            switch (formStep) {
              case 0:
                return (
                  <TournamentCreateMetaForm
                    isKing={isKing}
                    gameSetCount={gameSetCount}
                    tournamentName={tournamentName}
                    setTournamentName={setTournamentName}
                    handleModeSwitch={() => {
                      setIsKing((state) => !state);
                    }}
                    handleGameSetClick={(n) => {
                      if (n === null) {
                        setGameSetCount(1);
                        return;
                      }

                      setGameSetCount(n);
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
                    isKing={isKing}
                    attendants={kingAttendants}
                    tournamentName={tournamentName}
                    teamsAttendants={teamsAttendants}
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
