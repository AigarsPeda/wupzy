import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import FeatureCard from "~/components/elements/FeatureCard/FeatureCard";
import GradientButton from "~/components/elements/GradientButton/GradientButton";
import PageHead from "~/components/elements/PageHead/PageHead";
import Pricing from "~/components/elements/Pricing/Pricing";
import useRedirect from "~/hooks/useRedirect";

const HomePage: NextPage = () => {
  const { redirectToPath } = useRedirect();
  const { data: sessionData } = useSession();

  return (
    <>
      <PageHead
        title="Wupzy"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <main>
        <div className="pb-12 pt-3 md:pb-20 md:pt-16">
          <div>
            <h1 className="max-w-4xl font-primary text-4xl font-semibold tracking-tight md:text-6xl">
              Quick and effortless access to tournament results{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-4xl font-semibold text-transparent  md:text-6xl">
                everywhere.
              </span>
            </h1>
          </div>
        </div>
        <Pricing />
      </main>
    </>
  );
};

export default HomePage;
