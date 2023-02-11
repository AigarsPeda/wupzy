import ModalWrap from "components/elements/Modal/Modal";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";
import Button from "../../elements/Button/Button";
import Input from "../../elements/Input/Input";

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
        modalTitle="Crete new tournament"
        isModalVisible={isModalOpen}
        handleCancelClick={() => {
          setIsModalOpen(false);
        }}
      >
        <Input
          name="tournamentName"
          label="Name of tournament"
          handleInputChange={(e) => {
            setTournamentName(e.target.value);
          }}
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
