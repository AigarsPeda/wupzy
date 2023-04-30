import Image from "next/image";
import type { FC } from "react";

const AdditionalInfo: FC = () => {
  return (
    <div>
      <div className="mx-auto max-w-3xl">
        <p className="font-primary text-gray-600">
          With Wupzy, creating playoff tables has never been easier. Our
          user-friendly platform guides you through the process step-by-step, so
          you can quickly set up your playoff brackets and get back to enjoying
          the action. Say goodbye to confusing and time-consuming playoff table
          creation. Wupzy makes it a breeze!
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
