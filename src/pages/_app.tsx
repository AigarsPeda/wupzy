import { Koulen } from "@next/font/google";
import MainLayout from "components/layouts/MainLayout/MainLayout";
import { type AppType } from "next/app";
import "styles/globals.css";
import { api } from "utils/api";

const koulen = Koulen({
  weight: "400",
  display: "swap",
  variable: "--font-koulen",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-koulen: ${koulen.style.fontFamily};
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
