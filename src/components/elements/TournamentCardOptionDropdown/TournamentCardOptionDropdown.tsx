import Dropdown from "components/elements/Dropdown/Dropdown";
import ListButton from "components/elements/ListButton/ListButton";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { api } from "utils/api";

const DeleteTournament = dynamic(
  () => import("components/elements/DeleteTournament/DeleteTournament")
);

interface TournamentCardOptionDropdownProps {
  refetch: () => void;
  tournamentId: string;
}

const TournamentCardOptionDropdown: FC<TournamentCardOptionDropdownProps> = ({
  refetch,
  tournamentId,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mutate } = api.tournaments.deleteTournament.useMutation({
    onSuccess: () => {
      refetch();
      setIsModalOpen(false);
    },
  });

  return (
    <>
      <Dropdown
        dropdownClass="top-[2.28rem]"
        dropdownBtn={
          <button
            type="button"
            className="ml-0 flex items-center justify-center"
            onClick={() => {
              setIsDropdownOpen((state) => !state);
            }}
          >
            <BsThreeDotsVertical className="h-8 w-8 text-gray-400" />
          </button>
        }
        isDropdownOpen={isDropdownOpen}
        handleDropdownClose={() => {
          setIsDropdownOpen(false);
        }}
      >
        <ListButton
          btnTitle={
            <span className="flex w-full items-center justify-between text-red-600">
              Delete <FiTrash2 className="h-5 w-5" />
            </span>
          }
          handleClick={() => {
            setIsModalOpen((state) => !state);
          }}
        />
      </Dropdown>
      <DeleteTournament
        isModalOpen={isModalOpen}
        handleDeleteTournament={() => {
          mutate({ tournamentId });
        }}
        handleCloseModal={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default TournamentCardOptionDropdown;
