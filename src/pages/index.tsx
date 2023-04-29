import BuyProducts from "components/BuyProducts/BuyProducts";
import AdditionalInfo from "components/elements/AdditionalInfo/AdditionalInfo";
import CTASection from "components/elements/CTASection/CTASection";
import CancelSubscription from "components/elements/CancelSubscription/CancelSubscription";
import DesktopImg from "components/elements/DesktopImg/DesktopImg";
import ExplanationsSection from "components/elements/ExplanationsSection/ExplanationsSection";
import WupzyFeatures from "components/elements/WupzyFeatures/WupzyFeatures";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wupzy</title>
        <meta
          name="description"
          content="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
        />
        <meta
          property="og:description"
          content="Platform that lets you effortlessly create
          tournament tables."
        />
        <meta charSet="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:image" content="/logo_photo.jpg" />
        <meta name="robots" content="follow, index" />
        <meta property="og:title" content="Wupzy" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:description"
          content="Platform that lets you effortlessly create
          tournament tables."
        />
        <meta property="twitter:image" content="/logo_photo.jpg" />
        <meta property="twitter:title" content="Wupzy" />

        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <main className="px-4 py-4">
        <div className="mt-0 md:mt-10">
          <CTASection />
        </div>
        <BuyProducts />
        <ExplanationsSection />
        <DesktopImg />
        <WupzyFeatures />
        <div className="mt-10 md:mt-20">
          <BuyProducts />
        </div>
        <div className="mt-10 md:mt-20">
          <AdditionalInfo />
        </div>

        <CancelSubscription />
      </main>
    </>
  );
};

export default Home;
