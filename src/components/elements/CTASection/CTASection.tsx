import Button from "components/elements/Button/Button";
import RoundLinkButton from "components/elements/RoundLinkButton/RoundLinkButton";
import type { FC } from "react";

const CTASection: FC = () => {
  return (
    <div className="mt-14 flex w-full flex-col items-center justify-center text-center md:mt-20">
      <div className="max-w-6xl">
        <h1 className="text-5xl font-extrabold md:text-7xl">
          This is place for your games stats and more
        </h1>
        <p className="mx-auto mt-6 max-w-4xl md:text-xl">
          Here you can create tournaments, save scores for players and see your
          progress by comparing results with other players.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center md:flex-row">
          <div className="mb-4 md:mr-4 md:mb-0">
            <Button
              btnColor="outline"
              btnTitle={<span className=" w-48 px-3 text-sm ">Learn more</span>}
              onClick={() => {
                console.log("click");
              }}
            />
          </div>
          <RoundLinkButton
            href="/signup"
            bgColor="black"
            linkTitle="Get started"
            linkClassName="w-52 px-10 py-3 text-base md:mr-6 mb-6 md:mb-0"
          />
        </div>
      </div>
    </div>
  );
};

export default CTASection;
