import type { FC } from "react";
import ErrorMessage from "~/components/elements/ErrorMessage/ErrorMessage";
import { useLocalStorage } from "~/hooks/useLocalStorage";

const COOKIE_CONSENT = {
  version: 1,
  value: false,
  created: new Date().toISOString(),
};

const CookieConsentModal: FC = () => {
  const { value, setValue, isLoaded, isError } = useLocalStorage(
    "cookie-consent",
    COOKIE_CONSENT
  );

  const isCookieConsentValid = () => {
    if (!value.value) return false;

    if (value.version !== COOKIE_CONSENT.version) return false;

    return true;
  };

  return (
    <>
      {isLoaded && !isCookieConsentValid() && (
        <div className="fixed bottom-2 left-1/2 z-[500] mx-auto w-full max-w-4xl -translate-x-1/2 transform px-2 md:bottom-10">
          <div className="w-full items-start justify-between rounded bg-gray-900 px-3 py-3 text-white md:flex md:px-5">
            <div>
              <p>
                This website uses cookies to ensure you get the best experience.
              </p>
            </div>
            <div>
              <button
                className="mt-3 w-36 rounded bg-green-500 px-3 py-1 text-white md:mt-0"
                onClick={() =>
                  setValue({
                    version: 1,
                    value: true,
                    created: new Date().toISOString(),
                  })
                }
              >
                Allow cookies
              </button>
            </div>
            {isError && <ErrorMessage message="Error saving cookie consent" />}
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentModal;
