import { Koulen, Open_Sans, Bitter, Roboto, Cabin } from "@next/font/google";
import MainLayout from "components/layouts/MainLayout/MainLayout";
import { type AppType } from "next/app";
import "styles/globals.css";
import { api } from "utils/api";

const koulen = Koulen({
  weight: "400",
  display: "swap",
  subsets: ["latin"],
  variable: "--font-koulen",
});

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "300", "400", "500", "700", "900"],
});

const cabin = Cabin({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-cabin",
  weight: ["400", "500", "600", "700"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      {/* Adding css variable from font to use for app title */}
      <style jsx global>
        {`
          :root {
            --font-cabin: ${cabin.style.fontFamily};
            --font-koulen: ${koulen.style.fontFamily};
            --font-roboto: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
};

export default api.withTRPC(MyApp);
