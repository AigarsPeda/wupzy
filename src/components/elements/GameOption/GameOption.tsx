import { useState, type FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import EditGame from "~/components/elements/EditGame/EditGame";
import {
  SettingButton,
  SettingButtonContent,
} from "~/components/elements/SettingButton/SettingButton";

interface GameOptionProps {
  id: string;
}

const GameOption: FC<GameOptionProps> = ({ id }) => {
  const [gameId, setGameId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownClose = () => setIsDropdownOpen(false);
  const updateState = () => setIsDropdownOpen((state) => !state);

  return (
    <>
      <Dropdown
        top="2.5"
        width="20"
        isDropdownOpen={isDropdownOpen}
        handleDropdownClose={handleDropdownClose}
        dropdownBtn={
          <button
            type="button"
            onClick={updateState}
            className="flex w-full justify-end rounded-full p-2 text-gray-900 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-950"
          >
            <BsThreeDotsVertical className="h-5 w-5" />
          </button>
        }
      >
        <div className="flex w-48 flex-col justify-center px-2 py-1">
          <SettingButton
            handleClick={() => {
              setGameId(id);
              handleDropdownClose();
            }}
          >
            <SettingButtonContent
              action="Edit"
              title={
                <>
                  <FiEdit2 className="mr-3 h-5" />
                  Edit game
                </>
              }
            />
          </SettingButton>
        </div>
      </Dropdown>
      {gameId && (
        <EditGame
          gameId={gameId}
          handleModalClose={() => {
            setGameId("");
            handleDropdownClose();
          }}
        />
      )}
    </>
  );
};

export default GameOption;
