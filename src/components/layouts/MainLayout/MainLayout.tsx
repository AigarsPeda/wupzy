import NavBar from "components/elements/NavBar/NavBar";
import SubscriptionEndModal from "components/elements/SubscriptionEndModal/SubscriptionEndModal";
import type { FC, ReactNode } from "react";
import { api } from "utils/api";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { mutate: cancelSubscription } =
    api.stripe.cancelSubscription.useMutation();
  return (
    <div className="max-w-screen-1xl min-h-screen">
      <NavBar />
      <button
        className="bg-red-500 px-4 py-1"
        onClick={() => {
          cancelSubscription();
        }}
      >
        Cancel
      </button>
      <div className="bg-very-light-gray px-4 py-4 md:px-20 md:py-6">
        {children}
      </div>
      <SubscriptionEndModal />
    </div>
  );
};

export default MainLayout;
