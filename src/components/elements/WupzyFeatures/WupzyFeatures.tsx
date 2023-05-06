import useOnScreen from "hooks/useOnScreen";
import Image from "next/image";
import { useRef } from "react";
import { RoughNotation } from "react-rough-notation";

const WupzyFeatures = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useOnScreen(ref);

  return (
    <div className="mx-auto mt-10 max-w-4xl md:mt-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-14 font-primary text-gray-600 md:mb-16" ref={ref}>
          Plus, Wupzy&apos;s user-friendly interface and{" "}
          <RoughNotation
            padding={1}
            strokeWidth={3}
            color="#a855f7"
            type="underline"
            animationDelay={500}
            show={isIntersecting}
          >
            responsive design,
          </RoughNotation>{" "}
          whether you&apos;re using a desktop computer or a mobile phone. So,
          you can enjoy the full range of features and functionality on the go,
          no matter where you are
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative flex flex-col items-center justify-between rounded-lg p-2 text-center">
          <div className="flex h-full flex-col items-center justify-between text-center">
            <h1 className="font-primary text-2xl font-extrabold md:text-3xl">
              Create &quot;King&quot; tournament
            </h1>

            <p className="mx-auto my-5 max-w-2xl font-primary text-gray-600">
              In a King Tournament, every participant competes against every
              other participant, with the winner being the one with the highest
              overall point total at the end of the tournament.
            </p>
          </div>
          <Image
            width={350}
            height={550}
            alt="wupzy king view"
            className="mx-auto rounded-lg"
            src="/asset/wupzy_create.webp"
          />
          {/* <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-25 blur transition delay-75 duration-1000 group-hover:opacity-40 group-hover:duration-200"></div> */}
        </div>
        <div className="flex flex-col items-center justify-between rounded-lg p-2 text-center">
          <div className="flex h-full flex-col items-center justify-between text-center">
            <h1 className="font-primary text-2xl font-extrabold md:text-3xl">
              Never lose track of your games
            </h1>

            <p className="mx-auto my-5 max-w-2xl font-primary text-gray-600">
              Our platform allows you to easily view all of your games,
              including past results and upcoming matches, in one central
              location.
            </p>
            <Image
              width={350}
              height={550}
              alt="wupzy game view"
              className="mx-auto rounded-lg"
              src="/asset/wupzy_new_games_a.webp"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between rounded-lg p-2 text-center">
          <div className="flex h-full flex-col items-center justify-between text-center">
            <h1 className="font-primary text-2xl font-extrabold md:text-3xl">
              Create shareable links
            </h1>

            <p className="mx-auto my-5 max-w-2xl font-primary text-gray-600">
              Create shareable links for your tournament tables so that all
              participants can easily view game schedules and scores, no matter
              where they are.
            </p>

            <Image
              width={350}
              height={550}
              alt="wupzy share link view"
              className="mx-auto rounded-lg"
              src="/asset/wupzy_share_mob_link_a.webp"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WupzyFeatures;
