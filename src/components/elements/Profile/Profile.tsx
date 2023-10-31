import { STRIPE_ONE_TIME_PURCHASE_PRICE_ID } from "hardcoded";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";
import { api } from "~/utils/api";
import DisplayCredits from "../DisplayCredits/DisplayCredits";

const Profile = () => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { mutateAsync } = api.stripe.createCheckoutSession.useMutation();

  const checkout = async (priceId: string) => {
    const { checkoutUrl } = await mutateAsync({ priceId });

    if (checkoutUrl) {
      router.push(checkoutUrl).catch((err) => {
        console.error("Error redirecting to checkout", err);
      });
    }
  };
  return (
    <>
      <div className="flex justify-between">
        <p className="text-xs text-gray-500">{sessionData?.user.email}</p>
        <button
          className="text-xs text-gray-500 hover:text-gray-900"
          onClick={() => {
            void signOut({
              callbackUrl: "/",
            });
          }}
        >
          Log out
        </button>
      </div>
      <div className="py-4">
        <p>{sessionData?.user.name}</p>
        {/* <p className="text-xs">credits: {sessionData?.user.credits || 0}</p> */}
        <DisplayCredits credits={sessionData?.user.credits} />
      </div>
      <div>
        <PrimaryButton
          isFullWidth
          color="dark"
          handleClick={() => {
            checkout(STRIPE_ONE_TIME_PURCHASE_PRICE_ID).catch((err) => {
              console.error("Error creating checkout session", err);
            });
          }}
        >
          Buy credits
        </PrimaryButton>
      </div>
    </>
  );
};

export default Profile;
