import { useState, type FC } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import Dropdown from "~/components/elements/Dropdown/Dropdown";
import EditGame from "~/components/elements/EditGame/EditGame";
import OptionButton from "~/components/elements/OptionButton/OptionButton";
import { GameSchema } from "~/types/tournament.types";
import { api } from "~/utils/api";

interface GameOptionProps {
  id: string;
}

const GameOption: FC<GameOptionProps> = ({ id }) => {
  const [gameId, setGameId] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data, isFetching } = api.game.getGame.useQuery(
    { id: gameId },
    { enabled: Boolean(gameId) }
  );

  const handleDropdownClose = () => setIsDropdownOpen(false);
  const updateState = () => setIsDropdownOpen((state) => !state);

  return (
    <>
      {console.log("isFetching", isFetching)}
      <Dropdown
        width="20"
        dropdownClass="top-[2rem]"
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
        <div className="w-28 px-2">
          <OptionButton
            title="Edit"
            kind="warning"
            icon={<FiEdit2 />}
            isLoading={isFetching}
            handleClick={() => {
              setGameId(id);
              handleDropdownClose();
            }}
          />
        </div>
      </Dropdown>
      {data?.game && !isFetching && (
        <EditGame
          game={GameSchema.parse(data.game)}
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
