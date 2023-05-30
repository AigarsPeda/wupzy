import type { NextPage } from "next";

const CookieConsent: NextPage = () => {
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 py-2 text-center text-white">
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
      </div>
    </>
  );
};

export default CookieConsent;
