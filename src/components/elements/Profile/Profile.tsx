import { STRIPE_ONE_TIME_PURCHASE_PRICE_ID } from "hardcoded";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import DisplayCredits from "~/components/elements/DisplayCredits/DisplayCredits";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";
import { api } from "~/utils/api";

interface ProfileProps {
  userId: string;
}

const Profile: FC<ProfileProps> = ({ userId }) => {
  const router = useRouter();
  const { data: user } = api.user.getUser.useQuery(
    { id: userId || "" },
    { enabled: Boolean(userId) }
  );
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
        <p className="text-xs text-gray-500">{user?.user?.email}</p>
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
        <p>{user?.user?.name}</p>
        <DisplayCredits credits={user?.user?.credits} />
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
