"use client";

import type { FC } from "react";
import { useLocalStorage } from "hooks/useLocalStorage";
import ErrorMessage from "components/elements/ErrorMessage/ErrorMessage";

const CookieConsentModal: FC = () => {
  const { value, setValue, isError } = useLocalStorage("cookie-consent", false);
  return (
    <>
      {!value && (
        <div className="fixed bottom-2 left-0 w-full px-2">
          <div className="w-full rounded bg-gray-900 px-4 py-1 text-white">
            <p>
              This website uses cookies to ensure you get the best experience.
            </p>
            <button onClick={() => setValue(!value)}>Toggle</button>
            {isError && <ErrorMessage message="Error saving cookie consent" />}
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsentModal;
