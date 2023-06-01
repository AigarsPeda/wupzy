"use client";

import ErrorMessage from "components/elements/ErrorMessage/ErrorMessage";
import { useLocalStorage } from "hooks/useLocalStorage";
import type { FC } from "react";

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
        <div className="fixed bottom-2 left-0 w-full px-2">
          <div className="flex w-full items-start justify-between rounded bg-gray-900 px-5 py-2.5 text-white">
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
                className="w-36 rounded bg-green-500 px-3 py-1 text-white"
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
