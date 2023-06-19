import type { NextPage } from "next";
import PageHead from "~/components/elements/PageHead/PageHead";
import PrivacyPolicy from "~/components/elements/PrivacyPolicy/PrivacyPolicy";

const CookieConsentPage: NextPage = () => {
  return (
    <>
      <PageHead
        title="Wupzy | Privacy Policy"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <PrivacyPolicy />
    </>
  );
};

export default CookieConsentPage;
