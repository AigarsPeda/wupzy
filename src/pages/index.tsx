import BuyProducts from "components/BuyProducts/BuyProducts";
import CTASection from "components/elements/CTASection/CTASection";
import DesktopImg from "components/elements/DesktopImg/DesktopImg";
import ExplanationsSection from "components/elements/ExplanationsSection/ExplanationsSection";
import WupzyFeatures from "components/elements/WupzyFeatures/WupzyFeatures";
import { type NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>wupzy</title>
        <meta name="description" content="wupzy" />
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
        <div className="mt-10">
          <CTASection />
        </div>
        <BuyProducts />
        <ExplanationsSection />
        <DesktopImg />
        <WupzyFeatures />
      </main>
    </>
  );
};

export default Home;
