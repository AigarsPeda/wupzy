import { type FC, type ReactNode } from "react";
import classNames from "../../../utils/classNames";

interface SettingButtonProps {
  children: ReactNode;
  isDisables?: boolean;
  handleClick: () => void;
}

const SettingButton: FC<SettingButtonProps> = ({
  children,
  isDisables,
  handleClick,
}) => {
  return (
    <button
      disabled={isDisables}
      onClick={handleClick}
      className={classNames(
        isDisables ? "cursor-not-allowed" : "group hover:text-gray-950",
        "flex w-full items-center justify-between"
      )}
    >
      {/* <span className="flex w-full items-center justify-between"> */}
      {children}
      {/* </span> */}
    </button>
  );
};

interface SettingButtonContentProps {
  action: string;
  isDanger?: boolean;
  title: ReactNode | string;
}

const SettingButtonContent: FC<SettingButtonContentProps> = ({
  title,
  action,
  isDanger,
}) => {
  return (
    <>
      <span className="flex items-center text-gray-900">{title}</span>
      <span
        className={classNames(
          isDanger
            ? "text-red-500 hover:text-red-600"
            : "text-gray-500 hover:text-gray-900 group-hover:text-gray-900",
          "flex items-center text-sm"
        )}
      >
        {action}
      </span>
    </>
  );
};

export { SettingButton, SettingButtonContent };
