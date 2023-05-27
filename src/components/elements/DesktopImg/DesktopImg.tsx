import Image from "next/image";
import type { FC } from "react";

const DesktopImg: FC = () => {
  // const { windowSize } = useWindowSize();

  return (
    <div className="">
      <div className="relative">
        <Image
          width={1366}
          height={768}
          loading="lazy"
          placeholder="blur"
          alt="wupzy desktop view"
          blurDataURL="/asset/blurredImage.avif"
          className="mx-auto rounded-lg"
          src="/asset/main_img_2.png"
        />
      </div>
    </div>
  );
};

export default DesktopImg;
