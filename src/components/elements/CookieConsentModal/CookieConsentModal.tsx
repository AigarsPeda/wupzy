import type { FC } from "react";
import { useLocalStorage } from "hooks/useLocalStorage";

const CookieConsentModal: FC = () => {
  const [value, setValue] = useLocalStorage("cookie-consent", false);
  return (
    <div className="fixed bottom-0 mt-10 ">
      <h1 className="text-2xl">Cookie Consent</h1>
      <button onClick={() => setValue(!value)}>Toggle</button>
    </div>
  );
};

export default CookieConsentModal;
