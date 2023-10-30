import { type FC } from "react";
import classNames from "~/utils/classNames";

interface MailtoProps {
  body: string;
  email: string;
  subject: string;
  isSelected?: boolean;
  children?: string | React.ReactNode;
}

const Mailto: FC<MailtoProps> = ({
  body,
  email,
  subject,
  children,
  isSelected,
}) => {
  return (
    <a
      href={`mailto:${email}?subject=${
        encodeURIComponent(subject) || ""
      }&body=${encodeURIComponent(body) || ""}`}
      className={classNames(
        isSelected
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-900 hover:bg-gray-50",
        "group relative z-10 w-full items-center rounded-md border border-gray-900 px-4 py-2 text-center text-base font-normal shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
      )}
    >
      {children}
    </a>
  );
};

export default Mailto;
