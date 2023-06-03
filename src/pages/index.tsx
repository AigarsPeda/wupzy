import BuyProducts from "components/BuyProducts/BuyProducts";
import AdditionalInfo from "components/elements/AdditionalInfo/AdditionalInfo";
import Benefits from "components/elements/Benefits/Benefits";
import CTASection from "components/elements/CTASection/CTASection";
import CancelSubscription from "components/elements/CancelSubscription/CancelSubscription";
import DesktopImg from "components/elements/DesktopImg/DesktopImg";
import ExplanationsSection from "components/elements/ExplanationsSection/ExplanationsSection";
import PageHead from "components/elements/PageHead/PageHead";
import SportExplanationsSection from "components/elements/SportExplanationsSection/SportExplanationsSection";
import { type NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <PageHead
        title="Wupzy"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <main className="px-4 py-4">
        <div className="mt-0 md:mt-10">
          <CTASection />
        </div>
        <div className="mt-5">
          <DesktopImg />
        </div>
        <div className="mb-14 mt-5">
          <ExplanationsSection />
        </div>
        <BuyProducts />
        <div className="mt-14 md:mt-16">
          {/* <WupzyFeatures /> */}
          <Benefits />
        </div>
        {/* <SportExplanationsSection /> */}

        <div className="mt-10 md:mt-20">
          <BuyProducts />
        </div>
        {/* <div className="mt-10 md:mt-20">
          <AdditionalInfo />
        </div> */}

        {/* <CancelSubscription /> */}
      </main>
    </>
  );
};

export default Home;
