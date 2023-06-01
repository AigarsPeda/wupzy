import CookieConsent from "components/elements/CookieConsent/CookieConsent";
import PageHead from "components/elements/PageHead/PageHead";
import type { NextPage } from "next";

const CookieConsentPage: NextPage = () => {
  // If the user has already accepted the cookie consent, don't show it again
  return (
    <>
      {/* <div className="fixed bottom-0 left-0 right-0 bg-gray-900 py-2 text-center text-white">
        <div className="flex items-center justify-center">
          <div className="flex-1 text-sm">
            This website uses cookies to ensure you get the best experience on
            our website.{" "}
            <a
              href="https://www.cookiesandyou.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Learn more
            </a>
          </div>
          <div className="flex-1">
            <button
              className="rounded-sm bg-white px-2 py-1 text-gray-900"
              onClick={() => {
                localStorage.setItem("cookie_consent", "true");
                window.location.reload();
              }}
            >
              Accept
            </button>
          </div>
        </div>
      </div> */}
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
