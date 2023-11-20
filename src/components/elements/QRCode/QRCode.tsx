import { QRCodeSVG } from "qrcode.react";
import { useState, type FC } from "react";
import { HiDownload } from "react-icons/hi";
import { LuClipboardCopy } from "react-icons/lu";
import Bubble from "~/components/elements/Bubble/Bubble";
import Divider from "~/components/elements/Divider/Divider";
import {
  SettingButton,
  SettingButtonContent,
} from "~/components/elements/SettingButton/SettingButton";
import { env } from "~/env.mjs";
import copyToClipboard from "~/utils/copyToClipboard";

const EXPLAIN = "Scan to view tournament or use provided link:";

interface QRCodeProps {
  slug: string;
  name: string;
}

const QRCode: FC<QRCodeProps> = ({ slug, name }) => {
  const [isSuccessCopy, setIsSuccessCopy] = useState(false);

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code");
    const linkToTournament = `${env.NEXT_PUBLIC_APP_DOMAIN}/share/${
      slug || ""
    }`;

    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");

      canvas.width = svg.clientWidth + 500;

      const ctx = canvas.getContext("2d");

      const img = new Image();

      if (ctx) {
        img.onload = () => {
          const height = 20;
          const width = img.width + 20;

          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(img, 10, 10);

          ctx.fillStyle = "#000";
          ctx.font = "12px sans-serif";

          ctx.fillText(EXPLAIN, width, height);

          ctx.font = "16px sans-serif";
          ctx.fillText(linkToTournament, width, height + 20);

          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = `${name || "tournament"}-qrcode`;
          downloadLink.href = pngFile;

          downloadLink.click();
        };
      }

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  return (
    <>
      <Divider />
      <div>
        <SettingButton
          handleClick={() => {
            copyToClipboard(
              `${env.NEXT_PUBLIC_APP_DOMAIN}/share/${slug || ""}`,
              () => {
                setIsSuccessCopy(true);

                setTimeout(() => {
                  setIsSuccessCopy(false);
                }, 2000);
              },
            );
          }}
        >
          <SettingButtonContent
            action="Copy"
            title={
              <>
                <LuClipboardCopy className="mr-3" />
                <span className="max-w-[12.6rem] truncate">
                  {`${env.NEXT_PUBLIC_APP_DOMAIN}/share/${slug || ""}`}
                </span>
                <Bubble message="Copied!" isBubbleVisible={isSuccessCopy} />
              </>
            }
          />
        </SettingButton>
        <div className="pt-2">
          <SettingButton
            handleClick={() => {
              downloadQRCode();
            }}
          >
            <SettingButtonContent
              action="Download"
              title={
                <>
                  <HiDownload className="mr-3" />
                  <span className="max-w-[12.6rem] truncate">
                    Download QR code
                  </span>
                </>
              }
            />
          </SettingButton>
          <div className="pb-1 pt-2">
            <QRCodeSVG
              id="qr-code"
              value={`${env.NEXT_PUBLIC_APP_DOMAIN}/share/${slug || ""}`}
            />
          </div>
        </div>
      </div>
      <Divider />
    </>
  );
};

export default QRCode;
