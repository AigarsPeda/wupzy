import { useState, type FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import EditGame from "~/components/elements/EditGame/EditGame";
import SmallButton from "~/components/elements/SmallButton/SmallButton";

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
        top="2.2"
        width="20"
        isDropdownOpen={isDropdownOpen}
        handleDropdownClose={handleDropdownClose}
        dropdownBtn={
          <button
            type="button"
            onClick={updateState}
            className="flex w-full justify-end rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
          >
            <BsThreeDotsVertical />
          </button>
        }
      >
        <div className="flex w-32 flex-col justify-center px-2 py-1">
          <SmallButton
            title="Edit"
            color="orange"
            icon={<FiEdit2 className="mr-2 h-4 w-4" />}
            handleClick={() => {
              setGameId(id);
              handleDropdownClose();
            }}
          />
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
