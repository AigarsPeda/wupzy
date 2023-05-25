import Button from "components/elements/Button/Button";
import CancelSubscriptionModal from "components/elements/CancelSubscriptionModal/CancelSubscriptionModal";
import TabButton from "components/elements/TabButton/TabButton";
import UserProfile from "components/elements/UserProfile/UserProfile";
import useDelayUnmount from "hooks/useDelayUnmount";
import useOnClickOutside from "hooks/useOnClickOutside";
import type { FC } from "react";
import { useRef, useState } from "react";
import { api } from "utils/api";
import classNames from "utils/classNames";

const SettingsDrawer: FC = () => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { data } = api.users.getCurrentUser.useQuery();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { shouldRender, isAnimation } = useDelayUnmount(isDrawerOpen, 100);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);

  useOnClickOutside<HTMLDivElement>(drawerRef, () => {
    if (isCancelModalVisible) return;
    setIsDrawerOpen(false);
  });

  return (
    <>
      <div className="relative" ref={drawerRef}>
        <div
          className={classNames(
            isAnimation ? "translate-y-0" : "translate-y-[-100%]",
            "absolute left-0 right-0 top-0 z-[10] transition duration-300 ease-in-out "
          )}
        >
          {shouldRender && data?.user && (
            <div
              className={classNames(
                "w-full bg-gray-800 px-4 py-4 text-white shadow-[0_2px_5px_rgba(0,0,0,0.07)] outline-none transition-all duration-300 ease-in-out md:px-12 md:py-4"
              )}
            >
              <div className="mb-5 flex justify-end">
                <UserProfile user={data.user} />
              </div>
              {data.user.subscriptionStatus !== "canceled" && (
                <div className="flex items-end justify-end">
                  <Button
                    btnColor="red"
                    onClick={() => {
                      setIsCancelModalVisible(true);
                    }}
                    btnTitle="Cancel subscription"
                  />
                </div>
              )}
            </div>
          )}
          <div className="absolute -bottom-5 right-0 z-40 flex justify-end px-4 md:px-12">
            <TabButton
              handleClick={() => {
                setIsDrawerOpen((state) => !state);
              }}
            />
          </div>
        </div>
      </div>
      <CancelSubscriptionModal
        isModalVisible={isCancelModalVisible}
        handleModalClose={() => {
          setIsCancelModalVisible(false);
        }}
      />
    </>
  );
};

export default SettingsDrawer;
