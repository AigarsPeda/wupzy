import { Analytics } from "@vercel/analytics/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Cabin, Koulen, Roboto } from "next/font/google";
import CookieConsentModal from "~/components/elements/CookieConsentModal/CookieConsentModal";
import MainLayout from "~/components/layout/MainLayout/MainLayout";
import "~/styles/globals.css";
import { api } from "~/utils/api";

// Primary font
const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

// Secondary font
const koulen = Koulen({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-koulen",
});

// Fonts for logo
const cabin = Cabin({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-cabin",
  weight: ["400", "500", "600", "700"],
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-cabin: ${cabin.style.fontFamily};
            --font-koulen: ${koulen.style.fontFamily};
            --font-roboto: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <SessionProvider session={session}>
        <MainLayout>
          <Component {...pageProps} />
          <CookieConsentModal />
          <Analytics />
        </MainLayout>
      </SessionProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
