import { type NextPage } from "next";
import CTASection from "~/components/elements/CTASection/CTASection";
import EmailCollector from "~/components/elements/EmailCollector/EmailCollector";
import PageHead from "~/components/elements/PageHead/PageHead";

const HomePage: NextPage = () => {
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
        <div className="flex items-center justify-center">
          <EmailCollector />
        </div>
      </main>
    </>
  );
};

export default HomePage;
