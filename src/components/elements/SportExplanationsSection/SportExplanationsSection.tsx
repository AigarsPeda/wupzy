import useOnScreen from "hooks/useOnScreen";
import type { FC } from "react";
import { useRef } from "react";
import { RoughNotation } from "react-rough-notation";

const SportExplanationsSection: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useOnScreen(ref, "-50px");

  return (
    <div className="mx-auto mt-10 max-w-3xl md:mt-24" ref={ref}>
      <p className="font-primary text-gray-800 md:text-lg">
        <RoughNotation
          type="bracket"
          strokeWidth={3}
          color="#a855f7"
          animationDelay={500}
          show={isIntersecting}
          brackets={["left", "right"]}
        >
          Creating tournament tables with Wupzy allows you to save scores and
          view real-time results, all in one place. Participants don&apos;t have
          go and look for the results on board or ask the organizers for the
          results. See when next game is played. They can just go to the website
          and see the results. Wupzy isn&apos;t limited to just one sport. It
          caters to a wide range of athletic disciplines. From 🎾 tennis and 🏐
          volleyball to ⚽️ football and 🏀 basketball, you can rely on Wupzy to
          elevate your tournament organization, regardless of the sport
          you&apos;re involved in.
        </RoughNotation>
      </p>
    </div>
  );
};

export default SportExplanationsSection;
