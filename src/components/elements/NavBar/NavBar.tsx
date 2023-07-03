import { LINKS } from "hardcoded";
import { useRouter } from "next/router";
import type { FC } from "react";
import Logo from "~/components/elements/Logo/Logo";
import DesktopNav from "~/components/elements/NavBar/DesktopNav";
import MobileNav from "~/components/elements/NavBar/MobileNav";
import SettingsDrawer from "~/components/elements/SettingsDrawer/SettingsDrawer";
import { api } from "../../../utils/api";

const NavBar: FC = () => {
  const router = useRouter();

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
      <nav className="relative z-[50] flex items-center justify-between bg-slate-50 px-4 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.07)] md:px-12 md:py-4">
        <Logo />

        <div className="hidden w-full md:block">
          <DesktopNav links={LINKS} />
        </div>

        <button
          onClick={() => {
            checkout("price_1NP7sDFTT3aSVLG6wBWIJrXN").catch((err) => {
              console.log(err);
            });
            console.log("clicked");
          }}
        >
          Buy credits
        </button>

        <div className="w-full md:hidden">
          <MobileNav links={LINKS} />
        </div>
      </nav>
      {router.pathname === "/tournaments/[id]" && <SettingsDrawer />}
    </>
  );
};

export default NavBar;
