import useOnScreen from "hooks/useOnScreen";
import type { FC } from "react";
import { useRef } from "react";
import { RoughNotation } from "react-rough-notation";

const ExplanationsSection: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useOnScreen(ref, "-100px");

  return (
    <div className="mx-auto mt-10 max-w-3xl md:mt-14">
      <p className="font-primary text-gray-800 md:text-lg" ref={ref}>
        When i was playing volleyball i often had to organize tournaments and we
        used paper and pen to right down the scores and the results. I thought
        that there must be a better way to do this and that&apos;s why i created
        wupzy. Wupzy is a powerful platform that lets you{" "}
        <RoughNotation
          multiline
          padding={1}
          strokeWidth={3}
          color="#a855f7"
          type="underline"
          animationDelay={500}
          animationDuration={2000}
          show={isIntersecting}
        >
          effortlessly create tournament tables, save game scores, view
          real-time results, and share them with all participants in just a few
          clicks.
        </RoughNotation>
      </p>
    </div>
  );
};

export default ExplanationsSection;
