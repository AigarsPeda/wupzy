import { QRCodeSVG } from "qrcode.react";
import { type FC } from "react";
import { LuClipboardCopy, LuDownload } from "react-icons/lu";
import SmallButton from "~/components/elements/SmallButton/SmallButton";
import Tooltip from "~/components/elements/Tooltip/Tooltip";
import SmallModalLayout from "~/components/layout/SmallModalLayout/SmallModalLayout";
import { env } from "~/env.mjs";
import useTournament from "~/hooks/useTournament";

const EXPLAIN = "Scan to view tournament or use provided link:";

interface QRModalProps {
  isQRModal: boolean;
  handleCancelClicks: () => void;
}

const QRModal: FC<QRModalProps> = ({ isQRModal, handleCancelClicks }) => {
  const { tournament } = useTournament();

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code");
    const linkToTournament = `${env.NEXT_PUBLIC_APP_DOMAIN}/share/${
      tournament?.shareLink || ""
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
          downloadLink.download = `${tournament?.name || "tournament"}-qrcode`;
          downloadLink.href = pngFile;

          downloadLink.click();
        };
      }

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  };

  return (
    <SmallModalLayout
      isModalVisible={isQRModal}
      modalTitle="Scan the QR code"
      handleCancelClick={handleCancelClicks}
    >
      <div className="w-[22rem] px-3 pb-2 text-left md:w-full md:max-w-[28rem] md:px-6 md:pb-4">
        <p className="mb-6 mt-2 font-primary text-sm text-gray-700">
          Share this QR code with your tournament participants to let them see
          the tournament progress.
        </p>
        <div className="flex w-full justify-center">
          <div className="rounded-md bg-white p-2">
            <QRCodeSVG
              id="qr-code"
              value={`${env.NEXT_PUBLIC_APP_DOMAIN}/share/${
                tournament?.shareLink || ""
              }`}
            />
          </div>
        </div>
        <div>
          <div>
            <p className="mb-3 mt-8 font-primary text-sm text-gray-700">
              Or use this link:
            </p>
          </div>
          <div>
            <div className=" rounded-md border px-1 py-2">
              <p className="truncate font-primary">
                {`${env.NEXT_PUBLIC_APP_DOMAIN}/share/${
                  tournament?.shareLink || ""
                }`}
              </p>
            </div>

            <div className="mt-5 flex justify-between space-x-2">
              <div className="w-full">
                <Tooltip
                  isNowrap
                  position="md:right-0 -top-10"
                  content="Copy link to clipboard"
                >
                  <SmallButton
                    isFullWidth
                    color="dark"
                    icon={<LuClipboardCopy className="h-5 w-5" />}
                    handleClick={() => {
                      navigator.clipboard
                        .writeText(
                          `${env.NEXT_PUBLIC_APP_DOMAIN}/share/${
                            tournament?.shareLink || ""
                          }`,
                        )
                        .catch((err) => {
                          console.error(err);
                        });
                    }}
                  />
                </Tooltip>
              </div>
              <div className="w-full">
                <Tooltip
                  isNowrap
                  position="md:right-0 -top-10"
                  content="Download QR code"
                >
                  <SmallButton
                    isFullWidth
                    color="dark"
                    handleClick={downloadQRCode}
                    icon={<LuDownload className="h-5 w-5" />}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SmallModalLayout>
  );
};

export default QRModal;
