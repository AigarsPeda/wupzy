import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import LargeSwitch from "components/elements/LargeSwitch/LargeSwitch";
import ModalWrap from "components/elements/Modal/Modal";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";
import Tooltip from "../../elements/Tooltip/Tooltip";
import { BiInfoCircle } from "react-icons/bi";

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
        <div className="mb-6 flex items-center">
          <LargeSwitch
            isOn={isTeams}
            secondLabel="Teams"
            firstLabel="Players"
            handleToggle={() => setIsTeams((state) => !state)}
          />

          <Tooltip content="If you select players pointes will be counted for players individually and at the end there will be one winner.">
            <BiInfoCircle className="ml-2 h-5 w-5 text-gray-800" />
          </Tooltip>
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
