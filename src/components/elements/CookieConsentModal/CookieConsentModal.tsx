import type { FC } from "react";
import ErrorMessage from "~/components/elements/ErrorMessage/ErrorMessage";
import { useLocalStorage } from "~/hooks/useLocalStorage";

const COOKIE_CONSENT = {
  value: false,
  created: new Date().toISOString(),
};

const CookieConsentModal: FC = () => {
  const { value, setValue, isError } = useLocalStorage(
    "cookie-consent",
    COOKIE_CONSENT
  );
  return (
    <>
      {!value.value && (
        <div className="fixed bottom-20 left-1/2 mx-auto w-full max-w-4xl -translate-x-1/2 transform px-2">
          <div className="w-full items-start justify-between rounded bg-gray-900 px-3 py-3 text-white md:flex md:px-5">
            <div>
              <p>
                This website uses cookies to ensure you get the best experience.
                {/* You may visit our{" "}
                <Link
                  href="/cookie_consent"
                  className="font-normal text-white underline"
                >
                  Cookie Preferences
                </Link>{" "}
                page to learn more about the types of cookies we use and how to
                manage your preferences. */}
              </p>
            </div>
            <div>
              <button
                className="mt-3 w-36 rounded bg-green-500 px-3 py-1 text-white md:mt-0"
                onClick={() =>
                  setValue({
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
