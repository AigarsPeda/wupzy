import Button from "components/elements/Button/Button";
import Dropdown from "components/elements/Dropdown/Dropdown";
import ListButton from "components/elements/ListButton/ListButton";
import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import RoundButton from "components/elements/RoundButton/RoundButton";
import type { FC } from "react";
import { useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { api } from "utils/api";
import TopDrawer from "../TopDrawer/TopDrawer";

const ProfileDropdown: FC = () => {
  const { mutate: cancelSubscription } =
    api.stripe.cancelSubscription.useMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      <button
        className="h-5 w-40 rounded-b-md bg-red-500"
        onClick={() => {
          setIsDropdownOpen((state) => !state);
        }}
      >
        Test
      </button>
      {console.log(isDropdownOpen)}
      <TopDrawer
        isSideDrawerOpen={isDropdownOpen}
        handleClose={() => {
          setIsDropdownOpen(false);
        }}
      />
      {/* <Dropdown
        dropdownClass="top-[3rem]"
        dropdownBtn={
          // <RoundButton
          //   btnType="button"
          //   btnClass="ml-2"
          //   btnContent={<IoSettingsOutline className="h-7 w-7 md:h-5 md:w-5" />}
          //   handleClick={() => {
          //     setIsDropdownOpen((state) => !state);
          //   }}
          // />
          <div className="h-5 w-40 rounded-b-md bg-red-500"></div>
        }
        isDropdownOpen={isDropdownOpen}
        handleDropdownClose={() => {
          setIsDropdownOpen(false);
        }}
      >
        <ul>
          <li className="border-b-2 border-gray-100">
            <ListButton
              btnColor="red"
              btnTitle="Cancel subscription"
              handleClick={() => {
                setIsModalVisible(true);
              }}
            />
          </li>
        </ul>
      </Dropdown>
      <ModalWrap
        isModalVisible={isModalVisible}
        modalTitle="Cancel subscription"
        handleCancelClick={() => {
          setIsModalVisible(false);
        }}
      >
        <div className="w-full">
          <p className="">Are you sure you want to cancel your subscription?</p>
          <div className="mt-4 flex justify-center">
            <Button
              btnColor="red"
              btnClass="mr-2"
              btnTitle="Cancel"
              onClick={() => {
                cancelSubscription();
                setIsModalVisible(false);
              }}
            />
            <Button
              btnClass="ml-2"
              btnTitle="Close"
              onClick={() => {
                setIsModalVisible(false);
              }}
            />
          </div>
        </div>
      </ModalWrap> */}
    </>
  );
};

export default ProfileDropdown;
