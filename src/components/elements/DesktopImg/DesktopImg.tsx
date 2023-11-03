import Image from "next/image";
import type { FC } from "react";

const DesktopImg: FC = () => {
  return (
    <div className="relative">
      <Image
        width={1200}
        height={768}
        loading="lazy"
        // placeholder="blur"
        alt="wupzy desktop view"
        blurDataURL="/asset/blurredImage.avif"
        className="mx-auto rounded-lg"
        src="/asset/main_img_2.png"
      />
    </div>
  );
};

export default DesktopImg;
