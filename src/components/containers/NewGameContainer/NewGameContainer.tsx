import Button from "components/elements/Button/Button";
import ModalWrap from "components/elements/Modal/Modal";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";
import TournamentCreateMetaForm from "../../elements/TournamentCreateMetaForm/TournamentCreateMetaForm";

const NewGameContainer: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tournamentName, setTournamentName] = useState("");

  const createTournament = () => {
    console.log(tournamentName);
  };

  return (
    <>
      <RoundButton
        btnType="button"
        bgColor="outline"
        btnContent={
          <span className="flex items-center px-3 text-sm font-bold tracking-wide text-gray-800">
            New tournament
          </span>
        }
        handleClick={() => {
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
        <TournamentCreateMetaForm
          tournamentName={tournamentName}
          setTournamentName={setTournamentName}
        />

        <div className="flex w-full justify-between">
          <Button
            btnColor="red"
            btnTitle="Cancel"
            isDisabled={true}
            onClick={() => setIsModalOpen(false)}
          />
          <Button btnTitle="Create" onClick={createTournament} />
        </div>
      </ModalWrap>
    </>
  );
};

export default NewGameContainer;
