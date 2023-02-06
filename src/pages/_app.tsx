import { type AppType } from "next/app";
import "styles/globals.css";
import { api } from "utils/api";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import { Open_Sans } from "@next/font/google";

const inter = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={inter.className}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </main>
  );
};

export default api.withTRPC(MyApp);
