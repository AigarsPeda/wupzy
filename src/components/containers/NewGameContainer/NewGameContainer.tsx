import Button from "components/elements/Button/Button";
import ModalWrap from "components/elements/Modal/Modal";
import ProgressBar from "components/elements/ProgressBar/ProgressBar";
import RoundButton from "components/elements/RoundButton/RoundButton";
import TournamentAttendantForm from "components/elements/TournamentAttendantForm/TournamentAttendantForm";
import TournamentCreateMetaForm from "components/elements/TournamentCreateMetaForm/TournamentCreateMetaForm";
import type { FC } from "react";
import { useState } from "react";

const FORM_STEPS = ["Create tournament", "Add tournament attendant", "Review"];

const NewGameContainer: FC = () => {
  const [formStep, setFormStep] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentName, setTournamentName] = useState("");

  const [attendants, setAttendants] = useState<string[]>(["", "", "", ""]);

  const addNewAttendant = () => {
    setAttendants((state) => [...state, ""]);
  };

  const createTournament = () => {
    console.log(tournamentName);
  };

  const isFirstStep = formStep === 0;
  const isLastStep = formStep === FORM_STEPS.length - 1;
  const progress = Math.round((formStep / (FORM_STEPS.length - 1)) * 100);

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
        <div className="mb-5 w-full">
          <ProgressBar progress={progress} />
        </div>

        {(() => {
          switch (formStep) {
            case 0:
              return (
                <TournamentCreateMetaForm
                  tournamentName={tournamentName}
                  setTournamentName={setTournamentName}
                />
              );

            case 1:
              return (
                <TournamentAttendantForm
                  attendants={attendants}
                  setAttendants={setAttendants}
                  addNewAttendant={addNewAttendant}
                />
              );

            case 2:
              return <p>Review</p>;

            default:
              return <p>Error</p>;
          }
        })()}

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
            btnTitle={isLastStep ? "Create" : "Next"}
            onClick={() => {
              if (isLastStep) {
                createTournament();
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

export default NewGameContainer;
