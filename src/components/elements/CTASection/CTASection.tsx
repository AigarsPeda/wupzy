import RoundLinkButton from "components/elements/RoundLinkButton/RoundLinkButton";
import type { FC } from "react";
import { ImArrowRight2 } from "react-icons/im";

const CTASection: FC = () => {
  return (
    <div className="mt-52 flex w-full flex-col items-center justify-center text-center">
      <div className="max-w-6xl">
        <p className="text-2xl">This is place for</p>
        <h1 className="my-3 text-5xl font-bold tracking-wider">YOUR GAME</h1>
        <p className="mb-10 text-2xl">stats and more</p>
        <RoundLinkButton
          href="/signup"
          bgColor="violet"
          linkClassName="mt-12 w-52 text-xl tracking-wider px-10 py-3 text-base mx-auto"
          linkTitle={
            <>
              Get started
              <ImArrowRight2 className="ml-2 h-4 w-4 text-white" />
            </>
          }
        />
      </div>
    </div>
  );
};

export default CTASection;
