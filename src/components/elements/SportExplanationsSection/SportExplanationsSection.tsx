import useOnScreen from "hooks/useOnScreen";
import type { FC } from "react";
import { useRef } from "react";
import { RoughNotation } from "react-rough-notation";

const SportExplanationsSection: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useOnScreen(ref, "-50px");

  return (
    <div className="mx-auto my-14 max-w-3xl" ref={ref}>
      <p className="font-primary font-medium text-gray-800 md:text-lg">
        <RoughNotation
          type="bracket"
          strokeWidth={3}
          color="#a855f7"
          animationDelay={500}
          show={isIntersecting}
          brackets={["left", "right"]}
        >
          Wupzy isn&apos;t limited to just one sport. It caters to a wide range
          of athletic disciplines. From 🎾 tennis and 🏐 volleyball to ⚽️
          football and 🏀 basketball, you can rely on Wupzy to elevate your
          tournament organization, regardless of the sport you&apos;re involved
          in.
        </RoughNotation>
      </p>
    </div>
  );
};

export default SportExplanationsSection;
