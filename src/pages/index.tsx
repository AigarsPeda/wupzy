import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import FeatureCard from "~/components/elements/FeatureCard/FeatureCard";
import PageHead from "~/components/elements/PageHead/PageHead";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";
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
          <PrimaryButton
            color="dark"
            handleClick={() => {
              if (!sessionData) {
                void signIn();
                return;
              }
              void redirectToPath("/tournaments");
            }}
          >
            <span className="mr-4">Get started</span>
            <HiArrowRight className="h-4 w-4 text-white" />
          </PrimaryButton>
        </div>

        <div className="relative z-10 mx-auto flex items-center justify-center rounded-xl bg-slate-200">
          <div className="relative mx-auto w-full rounded-xl border border-white/25 bg-gray-200 bg-white/5 p-6 shadow-[inset_0_0_8px_rgba(255,255,255,0.2)] backdrop-blur-xl will-change-transform">
            <Image
              width={1300}
              height={1300}
              priority={true}
              src="/asset/desktop.webp"
              alt="Picture wupzy dashboard"
              className="hidden rounded md:block"
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
              src="/asset/mob_3.webp"
              alt="Picture wupzy dashboard"
              className="block rounded md:hidden"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                position: "relative",
              }}
            />
          </div>

          <div className="absolute left-1/2 top-1/2 -z-10 h-[85%] w-screen -translate-x-1/2 -translate-y-1/2 transform animate-background bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 bg-400"></div>
        </div>

        <div className="my-10 md:my-20">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FeatureCard
              icon={
                <div className="mx-auto w-full overflow-hidden rounded-lg border border-white/5 bg-slate-800/50 p-1.5">
                  <Image
                    width={300}
                    height={300}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      position: "relative",
                    }}
                    className="shadow-[inset_0_0_8px_rgb(255, 255, 255)] rounded-md  border border-white/5 shadow"
                    src="/asset/cloud_hand.webp"
                    alt="hand with cloud"
                  />
                </div>
              }
              title="Share Your Competition Easily"
              explanation="Empower users to effortlessly share competition updates with participants and fans through unique links, ensuring easy access to real-time results and leaderboards."
            />

            <FeatureCard
              icon={
                <div className="mx-auto w-full overflow-hidden rounded-lg border border-white/5 bg-slate-800/50 p-1.5">
                  <Image
                    width={300}
                    height={300}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      position: "relative",
                    }}
                    className="shadow-[inset_0_0_8px_rgb(255, 255, 255)] rounded-md  border border-white/5 shadow"
                    src="/asset/rocket.webp"
                    alt="rocket"
                  />
                </div>
              }
              title="Instant Results and Rankings"
              explanation="Streamline Competition Management: Rapidly Input Results, Instantly View Player Rankings, and Access Scheduled Games – All at Your Fingertips!"
            />

            <FeatureCard
              icon={
                <div className="mx-auto w-full overflow-hidden rounded-lg border border-white/5 bg-slate-800/50 p-1.5">
                  <Image
                    width={300}
                    height={300}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "fill",
                      position: "relative",
                    }}
                    className="shadow-[inset_0_0_8px_rgb(255, 255, 255)] rounded-md  border border-white/5 shadow"
                    src="/asset/cup.webp"
                    alt="cup"
                  />
                </div>
              }
              title="Track Progress and Celebrate Success"
              explanation="Effortlessly display competition standings, making it simple for participants and fans to track progress and witness the excitement unfold through our user-friendly leaderboard."
            />
          </div>
        </div>

        {/* <Pricing /> */}
      </main>
    </>
  );
};

export default HomePage;
