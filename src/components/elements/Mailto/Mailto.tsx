import { type FC } from "react";
import Spinner from "~/components/elements/Spinner/Spinner";
import classNames from "~/utils/classNames";

interface MailtoProps {
  body: string;
  email: string;
  subject: string;
  bgColor?: string;
  icon?: JSX.Element;
  isLoading?: boolean;
  isDisabled?: boolean;
  children?: string | React.ReactNode;
}

const Mailto: FC<MailtoProps> = ({
  body,
  icon,
  email,
  bgColor,
  subject,
  children,
  isLoading = false,
  isDisabled = false,
}) => {
  const isNotActionable = isLoading || isDisabled;

  return (
    <a
      href={`mailto:${email}?subject=${
        encodeURIComponent(subject) || ""
      }&body=${encodeURIComponent(body) || ""}`}
      className={classNames(
        isNotActionable && "cursor-not-allowed",
        "group relative inline-flex items-center justify-center overflow-hidden rounded-md p-0.5 font-medium tracking-[0.06em] transition duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500"
      )}
    >
      <span
        className={classNames(
          !isNotActionable &&
            "group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05]",
          "absolute h-full w-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6]"
        )}
      ></span>
      <span
        className={classNames(
          !isNotActionable && "group-hover:bg-opacity-0",
          bgColor || "bg-gray-100",
          "duration-400 relative flex h-11 min-w-[8rem] items-center justify-center rounded px-6 transition-all ease-out"
        )}
      >
        {isLoading ? (
          <Spinner color="light" size="xs" />
        ) : (
          <span
            className={classNames(
              !isNotActionable
                ? "text-gray-900 group-hover:text-white"
                : "text-gray-500",
              "relative flex items-center justify-center"
            )}
          >
            {children}
            {icon && <span className="ml-4">{icon}</span>}
          </span>
        )}
      </span>
    </a>
  );
};

export default Mailto;
