import type { FC } from "react";
import Image from "next/image";

const DesktopImg: FC = () => {
  return (
    <div className="mt-16">
      <div className="relative">
        <Image
          width={950}
          height={700}
          alt="wupzy desktop view"
          className="mx-auto rounded-lg border shadow"
          src="/asset/wupzy_desktop_view.webp"
        />
        <Image
          width={550}
          height={550}
          alt="wupzy score"
          className="absolute -left-0 top-1/2 mx-auto -translate-y-[75%] transform rounded-lg border shadow-md"
          src="/asset/wupzy_score.webp"
        />
        <Image
          width={695}
          height={695}
          alt="wupzy score"
          className="absolute -bottom-5 -right-8 mx-auto transform rounded-lg border shadow-md"
          src="/asset/wupzy_table.webp"
        />
        <Image
          width={150}
          height={150}
          alt="wupzy score"
          className="absolute right-[15.6rem] top-14 mx-auto transform rounded-lg border shadow-md"
          src="/asset/wupzy_share_link.webp"
        />
      </div>
    </div>
  );
};

export default DesktopImg;
