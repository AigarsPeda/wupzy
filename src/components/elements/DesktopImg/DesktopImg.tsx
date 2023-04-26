import useWindowSize from "hooks/useWindowSize";
import Image from "next/image";
import type { FC } from "react";
import classNames from "utils/classNames";

const DesktopImg: FC = () => {
  const { windowSize } = useWindowSize();

  return (
    <div className="mt-12 md:mt-24">
      <div className="relative">
        <Image
          width={850}
          height={600}
          alt="wupzy desktop view"
          className="mx-auto rounded-lg border shadow"
          src="/asset/wupzy_desktop_view.webp"
        />
        {windowSize.width > 780 && (
          <Image
            width={windowSize.width < 1060 ? 400 : 550}
            height={windowSize.width < 1060 ? 400 : 550}
            alt="wupzy score"
            className={classNames(
              windowSize.width < 1060 ? "left-[-3.3rem]" : "-left-0",
              "absolute  top-1/2 mx-auto -translate-y-[75%] transform rounded-lg border border-violet-300/70 shadow-md shadow-violet-200"
            )}
            src="/asset/wupzy_score.webp"
          />
        )}
        {windowSize.width > 780 && (
          <Image
            width={windowSize.width < 1060 ? 525 : 695}
            height={windowSize.width < 1060 ? 525 : 695}
            alt="wupzy score"
            className={classNames(
              windowSize.width < 1060
                ? "-bottom-0.5 right-[-5.4rem]"
                : "-bottom-5 -right-8",
              "absolute mx-auto transform rounded-lg border border-violet-300/70 shadow-md shadow-violet-200"
            )}
            src="/asset/wupzy_table.webp"
          />
        )}
        {windowSize.width > 780 && (
          <Image
            width={windowSize.width < 1060 ? 210 : 250}
            height={windowSize.width < 1060 ? 210 : 250}
            alt="wupzy score"
            className={classNames(
              windowSize.width < 1060
                ? "right-[4.6rem] top-9"
                : "right-60 top-11",
              "absolute mx-auto transform rounded-full border border-violet-300/70 shadow-md shadow-violet-200"
            )}
            src="/asset/wupzy_share_a.webp"
          />
        )}
      </div>
    </div>
  );
};

export default DesktopImg;
