import BuyProducts from "components/BuyProducts/BuyProducts";
import AdditionalInfo from "components/elements/AdditionalInfo/AdditionalInfo";
import CTASection from "components/elements/CTASection/CTASection";
import CancelSubscription from "components/elements/CancelSubscription/CancelSubscription";
import DesktopImg from "components/elements/DesktopImg/DesktopImg";
import ExplanationsSection from "components/elements/ExplanationsSection/ExplanationsSection";
import PageHead from "components/elements/PageHead/PageHead";
import WupzyFeatures from "components/elements/WupzyFeatures/WupzyFeatures";
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
