import Image from "next/image";

const WupzyFeatures = () => {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        <div className="relative flex flex-col items-center justify-between rounded-lg p-2 text-center">
          <div className="flex h-full flex-col items-center justify-between text-center">
            <h1 className="mt-8 font-primary text-2xl font-extrabold text-white md:text-3xl">
              <mark className="bg-gray-900 text-gray-50">
                Create &quot;King&quot; tournament
              </mark>
            </h1>

            <p className="mx-auto my-5 max-w-2xl font-primary text-gray-800">
              In a King Tournament, every participant competes against every
              other participant, with the winner being the one with the highest
              overall point total at the end of the tournament.
            </p>
          </div>
          <div
            style={{
              width: "220px",
              height: "420px",
              position: "relative",
              alignSelf: "center",
            }}
          >
            <Image
              width={350}
              height={550}
              placeholder="blur"
              alt="wupzy king view"
              className="mx-auto rounded-lg"
              src="/asset/wupzy_create.webp"
              blurDataURL="/asset/blurredImage.avif"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between rounded-lg p-2 text-center">
          <div className="flex h-full flex-col items-center justify-between text-center">
            <h1 className="mt-8 px-2 font-primary text-2xl font-extrabold text-white md:text-3xl">
              <mark className="bg-gray-900 text-gray-50">
                Never lose track of your games
              </mark>
            </h1>

            <p className="mx-auto my-5 max-w-2xl font-primary text-gray-800">
              Our platform allows you to easily view all of your games,
              including past results and upcoming matches, in one central
              location.
            </p>
            <div
              style={{
                width: "220px",
                height: "420px",
                position: "relative",
                alignSelf: "center",
              }}
            >
              <Image
                width={350}
                height={550}
                placeholder="blur"
                alt="wupzy game view"
                className="mx-auto rounded-lg"
                src="/asset/wupzy_new_games_a.webp"
                blurDataURL="/asset/blurredImage.avif"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between rounded-lg p-2 text-center">
          <div className="flex h-full flex-col items-center justify-between text-center">
            <h1 className="mt-8 font-primary text-2xl font-extrabold text-white md:text-3xl">
              <mark className="bg-gray-900 text-gray-50">
                Create shareable links
              </mark>
            </h1>

            <p className="mx-auto my-5 max-w-2xl font-primary text-gray-800">
              Create shareable links for your tournament tables so that all
              participants can easily view game schedules and scores, no matter
              where they are.
            </p>
            <div
              style={{
                width: "220px",
                height: "420px",
                position: "relative",
                alignSelf: "center",
              }}
            >
              <Image
                width={350}
                height={550}
                placeholder="blur"
                alt="wupzy share link view"
                className="mx-auto rounded-lg"
                src="/asset/wupzy_share_mob_link_a.webp"
                blurDataURL="/asset/blurredImage.avif"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WupzyFeatures;