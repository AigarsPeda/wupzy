import useOnScreen from "hooks/useOnScreen";
import type { FC } from "react";
import { useRef } from "react";
import { RoughNotation } from "react-rough-notation";

const ExplanationsSection: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useOnScreen(ref, "-100px");

  return (
    <div className="mx-auto mt-10 max-w-3xl md:mt-20">
      <p
        className="font-primary font-medium text-gray-800 md:text-lg"
        ref={ref}
      >
        What is wupzy? Wupzy is a powerful platform that lets you effortlessly
        create{" "}
        <RoughNotation
          multiline
          padding={1}
          strokeWidth={3}
          color="#a855f7"
          type="underline"
          animationDelay={500}
          show={isIntersecting}
        >
          tournament tables,
        </RoughNotation>{" "}
        <RoughNotation
          multiline
          padding={1}
          strokeWidth={3}
          color="#a855f7"
          type="underline"
          show={isIntersecting}
          animationDelay={1200}
        >
          {" "}
          save game scores,
        </RoughNotation>{" "}
        view{" "}
        <RoughNotation
          multiline
          padding={1}
          strokeWidth={3}
          color="#a855f7"
          type="underline"
          show={isIntersecting}
          animationDelay={2200}
        >
          {" "}
          real-time results,
        </RoughNotation>{" "}
        and share them with all participants in just a few clicks
      </p>
    </div>
  );
};

export default ExplanationsSection;
