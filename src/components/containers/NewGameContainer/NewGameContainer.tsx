import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import ModalWrap from "components/elements/Modal/Modal";
import RoundButton from "components/elements/RoundButton/RoundButton";
import Switch from "components/elements/Switch/Switch";
import type { FC } from "react";
import { useState } from "react";

const NewGameContainer: FC = () => {
  const [isTeams, setIsTeams] = useState(false);
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
        modalWidth="4xl"
        isModalVisible={isModalOpen}
        modalTitle="Crete new tournament"
        handleCancelClick={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="max-w-xs">
          <Input
            name="tournamentName"
            label="Name of tournament"
            handleInputChange={(e) => {
              setTournamentName(e.target.value);
            }}
          />
        </div>
        <div>
          <Switch
            isOn={isTeams}
            handleToggle={() => {
              setIsTeams((state) => !state);
            }}
          />
        </div>

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
