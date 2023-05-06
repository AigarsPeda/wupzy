import useOnScreen from "hooks/useOnScreen";
import Image from "next/image";
import type { FC } from "react";
import { useRef } from "react";
import { RoughNotation } from "react-rough-notation";

const AdditionalInfo: FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isIntersecting } = useOnScreen(ref, "-150px");

  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <p className="font-primary text-gray-600" ref={ref}>
          With Wupzy,{" "}
          <RoughNotation
            multiline
            padding={1}
            strokeWidth={3}
            color="#a855f7"
            type="underline"
            animationDelay={500}
            show={isIntersecting}
          >
            creating playoff tables,
          </RoughNotation>{" "}
          has never been easier. Our user-friendly platform guides you through
          the process step-by-step, so you can quickly set up your playoff
          brackets and get back to enjoying the action. Say goodbye to confusing
          and time-consuming playoff table creation. Wupzy makes it a breeze!
        </p>
      </div>
      <Image
        width={850}
        height={600}
        loading="lazy"
        alt="wupzy playoffs view"
        className="mx-auto rounded-lg"
        src="/asset/wupzy_playoffs.webp"
      />
    </div>
  );
};

export default AdditionalInfo;
