import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
import PageHead from "~/components/elements/PageHead/PageHead";
import PrimaryButton from "~/components/elements/PrimaryButton/PrimaryButton";
import useRedirect from "~/hooks/useRedirect";
import { HOW_T0_STEPS } from "../../hardcoded";

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
        <div className="pb-12 pt-3 md:pb-28 md:pt-16">
          <div>
            <h1 className="max-w-4xl font-primary text-6xl font-semibold tracking-tight">
              Create your{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-6xl font-semibold  text-transparent">
                Tournament
              </span>
            </h1>
            <h2 className="mb-5 mt-8 max-w-2xl font-primary text-xl font-normal text-gray-600">
              Efficiently coordinate matches, track results, and share updates
              with participants.
            </h2>
          </div>
          <div className="pt-8">
            <PrimaryButton
              color="dark"
              padding="lg"
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
        </div>

        <div className="relative z-10 mx-auto flex items-center justify-center rounded-xl bg-slate-200">
          <div className="relative mx-auto w-full rounded-xl border border-white/25 bg-gray-200 bg-white/5 p-6 shadow-[inset_0_0_8px_rgba(255,255,255,0.2)] backdrop-blur-xl will-change-transform">
            <Image
              width={1300}
              height={1300}
              placeholder="blur"
              src="/asset/main.webp"
              alt="Picture wupzy dashboard"
              blurDataURL="/asset/blur.jpg"
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
              placeholder="blur"
              src="/asset/main_mob.jpeg"
              alt="Picture wupzy dashboard"
              blurDataURL="/asset/blur.jpg"
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

        <div className="mx-auto my-20 w-full max-w-3xl text-center md:my-36">
          <h2 className="text-2xl font-normal text-gray-600">
            How does this work?{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-2xl font-semibold  text-transparent">
              It&apos;s straightforward!
            </span>{" "}
          </h2>
        </div>

        <div className="space-y-5 md:space-y-10">
          {HOW_T0_STEPS.map((step, index) => {
            return (
              <div
                key={step.title}
                className="relative z-10 mx-auto flex items-center justify-center rounded-xl bg-slate-200"
              >
                <div className="relative mx-auto w-full grid-cols-6 gap-4 rounded-xl border border-white/25 bg-gray-200 bg-white/5 p-6 shadow-[inset_0_0_8px_rgba(255,255,255,0.2)] backdrop-blur-xl will-change-transform md:grid">
                  <div className="col-span-3 flex flex-col items-center justify-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
                      <span className="text-2xl font-semibold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-3 text-gray-600">{step.description}</p>
                  </div>
                  <div className="col-span-3 mt-4 overflow-hidden rounded-md md:mt-0">
                    <Image
                      width={900}
                      height={900}
                      placeholder="blur"
                      src={step.zoomImageDesktop}
                      alt="Picture wupzy dashboard"
                      blurDataURL="/asset/blur.jpg"
                      className="scale-125 md:scale-100"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "fill",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="mx-auto my-20 max-w-3xl md:my-48">
          <h2 className="text-xl font-normal">
            Optimize competition management and user experience through our
            intuitive platform, enabling effortless sharing, real-time tracking,
            and interactive leaderboards for enhanced engagement.
          </h2>
        </div> */}

        {/* <div className="my-10 md:my-20">
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
        </div> */}
      </main>
    </>
  );
};

export default HomePage;
