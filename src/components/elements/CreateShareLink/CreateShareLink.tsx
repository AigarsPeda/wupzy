import ModalWrap from "components/elements/ModalWrap/ModalWrap";
import RoundButton from "components/elements/RoundButton/RoundButton";
import { QRCodeSVG } from "qrcode.react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import type { TournamentType } from "types/tournament.types";
import { api } from "utils/api";
import { FiShare } from "react-icons/fi";
import useWindowSize from "../../../hooks/useWindowSize";
import { MdIosShare } from "react-icons/md";

const BASE_URL = process.env.NEXT_PUBLIC_APP_DOMAIN || "";

interface ShareLinkProps {
  tournament: TournamentType;
}

const CreateShareLink: FC<ShareLinkProps> = ({ tournament }) => {
  const { windowSize } = useWindowSize();
  const [shareLinkId, setShareLinkId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutateAsync, isLoading } = api.shareLink.createShareLink.useMutation({
    onSuccess: (data) => {
      setIsModalOpen(true);
      setShareLinkId(data.shareLink.id);
    },
  });

  const createShareLink = async () => {
    const data = await mutateAsync({
      tournamentId: tournament.id,
    });

    if (!data) return;

    setShareLinkId(data.shareLink.id);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!tournament.shareLinkId) return;

    setShareLinkId(tournament.shareLinkId);
  }, [tournament]);

  return (
    <div className="ml-2">
      <RoundButton
        textSize="sm"
        btnClass="mr-2"
        btnType="button"
        isLoading={isLoading}
        btnContentClassNames="md:px-4"
        icon={<MdIosShare className="h-5 w-5" />}
        btnContent={shareLinkId && windowSize.width > 500 ? " Share link" : ""}
        handleClick={() => {
          if (shareLinkId) {
            setIsModalOpen((state) => !state);
            return;
          }

          createShareLink().catch((err) => {
            console.error(err);
          });
        }}
      />

      <ModalWrap
        isModalVisible={isModalOpen}
        handleCancelClick={() => {
          setIsModalOpen(false);
        }}
        modalTitle="Share Link"
      >
        <div className="w-full">
          <p className="text-sm text-gray-500">
            Share this link with your tournament participants to allow them to
            see results and upcoming matches.
          </p>
          {shareLinkId ? (
            <div className="mt-4">
              <p className="text-sm text-gray-800">
                {`${BASE_URL}/share/${shareLinkId}`}
              </p>
              <div className="my-5 flex w-full justify-center">
                <QRCodeSVG value={`${BASE_URL}/share/${shareLinkId}`} />
              </div>
            </div>
          ) : (
            <p>Something went wrong. Please try again!</p>
          )}
        </div>
      </ModalWrap>
    </div>
  );
};

export default CreateShareLink;
