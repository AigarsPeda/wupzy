import Button from "components/elements/Button/Button";
import Input from "components/elements/Input/Input";
import LargeSwitch from "components/elements/LargeSwitch/LargeSwitch";
import ModalWrap from "components/elements/Modal/Modal";
import RoundButton from "components/elements/RoundButton/RoundButton";
import Tooltip from "components/elements/Tooltip/Tooltip";
import GridLayout from "components/layouts/GridLayout/GridLayout";
import type { FC } from "react";
import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";

const NewGameContainer: FC = () => {
  const [isPayers, setIsPayers] = useState(true);
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
        <GridLayout minWith="175px">
          <Input
            name="tournamentName"
            label="Name of tournament"
            handleInputChange={(e) => {
              setTournamentName(e.target.value);
            }}
          />
          <div className="mr-5 flex w-full items-center justify-center md:justify-end">
            <LargeSwitch
              isOn={isPayers}
              secondLabel="Teams"
              firstLabel="Players"
              handleToggle={() => setIsPayers((state) => !state)}
            />
            <div className="flex h-full items-start">
              <Tooltip content="If you select players pointes will be counted for players individually and at the end there will be one winner.">
                <BiInfoCircle className="ml-2 h-5 w-5 text-gray-800" />
              </Tooltip>
            </div>
          </div>
        </GridLayout>

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
