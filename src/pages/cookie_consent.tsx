import type { NextPage } from "next";
import CookieConsent from "~/components/elements/CookieConsent/CookieConsent";
import PageHead from "~/components/elements/PageHead/PageHead";

const CookieConsentPage: NextPage = () => {
  return (
    <>
      <PageHead
        title="Wupzy | Terms of Service"
        descriptionShort="Platform that lets you effortlessly create tournament tables."
        descriptionLong="Wupzy is a powerful platform that lets you effortlessly create
          tournament tables, save game scores, view real-time results, and share
          them with all participants in just a few clicks."
      />
      <CookieConsent />
    </>
  );
};

export default CookieConsentPage;
