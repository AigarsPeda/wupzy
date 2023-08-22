import { Analytics } from "@vercel/analytics/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Alumni_Sans, Cabin, Roboto } from "next/font/google";
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

// Fonts for logo
const cabin = Cabin({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-cabin",
  weight: ["400", "500", "600", "700"],
});

const alumni = Alumni_Sans({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-alumni",
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
            --font-roboto: ${roboto.style.fontFamily};
            --font-alumni: ${alumni.style.fontFamily};
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
