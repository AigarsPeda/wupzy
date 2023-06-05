import type { FC } from "react";
import PageHead from "~/components/elements/PageHead/PageHead";
import TermsOfAgreement from "~/components/elements/TermsOfAgreement/TermsOfAgreement";

const TermsOfService: FC = () => {
  return (
    <>
      <PageHead
        title="Wupzy | Terms of Service"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <TermsOfAgreement />
    </>
  );
};

export default TermsOfService;
