import useOnScreen from "hooks/useOnScreen";
import type { FC } from "react";
import { useRef } from "react";
import { RoughNotation } from "react-rough-notation";

const ExplanationsSection: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useOnScreen(ref, "-100px");

  return (
    <div className="mx-auto max-w-3xl">
      <p className="font-primary text-gray-800 md:text-lg" ref={ref}>
        Ready to take your sport competitions to the next level? Sign up for
        Wupzy today and experience the convenience, efficiency, and joy of
        seamless competition management. For{" "}
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
          just 1.95 EUR per month
        </RoughNotation>
        , unlock a world of possibilities and never miss a moment of sport
        action again!
      </p>
    </div>
  );
};

export default ExplanationsSection;
