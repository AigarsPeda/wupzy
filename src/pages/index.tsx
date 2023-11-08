import { HOW_T0_STEPS } from "hardcoded";
import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { HiArrowRight } from "react-icons/hi";
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
      <main>
        <div className="pb-12 pt-3 md:pb-28 md:pt-16">
          <div>
            <h1 className="max-w-4xl font-primary text-5xl font-semibold tracking-tight md:text-6xl">
              Organize Your tournament in{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-semibold  text-transparent">
                minutes
              </span>
            </h1>
            <h2 className="mb-5 mt-8 max-w-2xl font-primary text-xl font-normal text-gray-600">
              Seamlessly record match outcomes and monitor rankings in a
              real-time leaderboard. Share the excitement with all participants
              in just a few clicks.
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
          <div className="relative mx-auto w-full rounded-xl border border-white/25 bg-gray-200 bg-white/5 p-4 shadow-[inset_0_0_8px_rgba(255,255,255,0.2)] backdrop-blur-xl will-change-transform md:p-6">
            <Image
              width={1300}
              height={1300}
              placeholder="blur"
              src="/asset/desktop_3.webp"
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

        <div className="mx-auto mb-10 mt-20 w-full max-w-3xl text-center md:mb-16 md:mt-36">
          <h2 className="text-2xl font-normal text-gray-600">
            How does this work?{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text font-semibold  text-transparent">
              It&apos;s straightforward!
            </span>{" "}
          </h2>
        </div>

        <div className="space-y-5 md:space-y-10">
          {HOW_T0_STEPS.map((step, index) => {
            return (
              <div
                key={step.title}
                className="relative z-10 mx-auto flex max-w-5xl items-center justify-center rounded-xl bg-slate-200"
              >
                <div className="relative mx-auto w-full grid-cols-6 gap-4 rounded-xl border border-white/25 bg-gray-200 bg-white/5 p-4 shadow-[inset_0_0_8px_rgba(255,255,255,0.2)] backdrop-blur-xl will-change-transform md:grid md:max-h-[28rem]">
                  <div className="col-span-3 flex flex-col justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500">
                      <span className="text-2xl font-semibold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="max-w-sm">
                      <h3 className="mt-4 text-2xl font-semibold md:mt-0">
                        {step.title}
                      </h3>
                      <p className="mt-4">{step.description}</p>
                      {/* <p className="mt-4 text-sm text-gray-500">
                        {step.additionalDescription}
                      </p> */}
                    </div>
                    <div />
                  </div>
                  <div className="col-span-3 mt-4 overflow-hidden rounded-md md:mt-0">
                    <Image
                      width={494}
                      height={484}
                      placeholder="blur"
                      src={step.zoomImageDesktop}
                      alt="Picture wupzy dashboard"
                      blurDataURL="/asset/blur.jpg"
                      className="scale-125 md:scale-100"
                      style={{
                        width: "100%",
                        height: "100%",
                        // objectFit: "cover",
                        objectFit: "scale-down",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default HomePage;
