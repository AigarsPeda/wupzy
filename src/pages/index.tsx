import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import GradientButton from "~/components/elements/GradientButton/GradientButton";
import PageHead from "~/components/elements/PageHead/PageHead";
import useRedirect from "~/hooks/useRedirect";
import useWindowSize from "~/hooks/useWindowSize";
import { GoArrowRight } from "react-icons/go";
import { HiArrowRight } from "react-icons/hi";

const HomePage: NextPage = () => {
  const { windowSize } = useWindowSize();
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
      <main className="px-4 py-4">
        <div className="mb-5 mt-0 md:mt-10">
          <h1 className="max-w-4xl font-primary text-6xl font-semibold tracking-tight">
            Create your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-6xl font-semibold  text-transparent">
              Tournament
            </span>
          </h1>
          <h2 className="mb-5 mt-8 max-w-2xl font-primary font-medium text-gray-800">
            Wupzy: Simplifying sports tournament organization. Save scores,
            access results, stay updated, and share your game tables with
            participants.
          </h2>
        </div>
        <div className="mb-10 mt-10 md:mb-16">
          <GradientButton
            type="button"
            title={sessionData ? "Your tournaments" : "Try it now"}
            icon={
              <HiArrowRight className="h-5 w-5 text-gray-900 group-hover:text-white" />
            }
            handleClick={() => {
              if (!sessionData) {
                void signIn();
                return;
              }
              void redirectToPath("/tournaments");
            }}
          />
        </div>
        <div className="w-full rounded-md bg-gray-200 p-6">
          {windowSize.width > 550 ? (
            <Image
              src="/asset/main_desktop.webp"
              width={1000}
              height={1000}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                position: "relative",
              }}
              alt="Picture wupzy dashboard"
            />
          ) : (
            <Image
              src="/asset/main_mob.webp"
              width={1000}
              height={1000}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                position: "relative",
              }}
              alt="Picture wupzy dashboard"
            />
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
