import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
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
            bgColor="bg-gray-100"
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

        <div className="relative z-10 mx-auto flex items-center justify-center rounded-xl bg-slate-200">
          <div className="relative mx-auto w-full rounded-xl border border-white/25 bg-gray-200 bg-white/5 p-6 shadow-[inset_0_0_8px_rgba(255,255,255,0.2)] backdrop-blur-xl will-change-transform">
            <Image
              width={1000}
              height={1000}
              priority={true}
              className="hidden md:block"
              alt="Picture wupzy dashboard"
              src="/asset/main_desktop_2.webp"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                position: "relative",
              }}
            />
            <Image
              width={1000}
              height={1000}
              src="/asset/main_mob.webp"
              className="block md:hidden"
              alt="Picture wupzy dashboard"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                position: "relative",
              }}
            />
          </div>

          <div className="absolute left-1/2 top-1/2 -z-10 h-[32rem] w-screen -translate-x-1/2 -translate-y-1/2 transform bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"></div>
        </div>

        <Pricing />
      </main>
    </>
  );
};

export default HomePage;
