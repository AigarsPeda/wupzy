import { STRIPE_PRICE_ID } from "hardcoded";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type FC } from "react";
import AuthenticateUser from "~/components/elements/AuthenticateUser/AuthenticateUser";
import Button from "~/components/elements/Button/Button";
import NavLink from "~/components/elements/NavBar/NavLink";
import { type LinkType } from "~/types/utils.types";
import { api } from "~/utils/api";

interface DesktopNavProps {
  links: LinkType[];
}

const DesktopNav: FC<DesktopNavProps> = ({ links }) => {
  const router = useRouter();
  const { data: sessionData, status } = useSession();
  const { mutateAsync } = api.stripe.createCheckoutSession.useMutation();

  const checkout = async (priceId: string) => {
    const { checkoutUrl } = await mutateAsync({ priceId });

    if (checkoutUrl) {
      router.push(checkoutUrl).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="ml-8 flex w-full">
          <NavLink isFlex links={links} sessionData={sessionData} />
        </div>
        <div className="flex space-x-2">
          {sessionData?.user.id && (
            <Button
              color="light"
              title="Buy 100 credits"
              handleClick={() => {
                checkout(STRIPE_PRICE_ID).catch((err) => {
                  console.error(err);
                });
              }}
            />
          )}
          <AuthenticateUser sessionData={sessionData} status={status} />
        </div>
      </div>
    </>
  );
};

export default DesktopNav;
