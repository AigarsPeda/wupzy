import Image from "next/image";
import { RoughNotation } from "react-rough-notation";

const WupzyFeatures = () => {
  return (
    <div className="mx-auto mt-10 max-w-4xl md:mt-20">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative flex flex-col items-center justify-between rounded-lg p-2 text-center">
          <div className="flex h-full flex-col items-center justify-between text-center">
            <h1 className="font-primary text-2xl font-extrabold text-white md:text-3xl">
              <RoughNotation
                show
                multiline
                color="#030712"
                animate={false}
                type="highlight"
              >
                Create &quot;King&quot; tournament
              </RoughNotation>
            </h1>

            <p className="mx-auto my-5 max-w-2xl font-primary text-gray-800">
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
        </div>
        <div className="flex flex-col items-center justify-between rounded-lg p-2 text-center">
          <div className="flex h-full flex-col items-center justify-between text-center">
            <h1 className="px-2 font-primary text-2xl font-extrabold text-white md:text-3xl">
              <RoughNotation
                show
                multiline
                color="#030712"
                animate={false}
                type="highlight"
              >
                Never lose track of your games
              </RoughNotation>
            </h1>

            <p className="mx-auto my-5 max-w-2xl font-primary text-gray-800">
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
            <h1 className="font-primary text-2xl font-extrabold text-white md:text-3xl">
              <RoughNotation
                show
                multiline
                color="#030712"
                animate={false}
                type="highlight"
              >
                Create shareable links
              </RoughNotation>
            </h1>

            <p className="mx-auto my-5 max-w-2xl font-primary text-gray-800">
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
