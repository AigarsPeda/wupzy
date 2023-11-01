import { type FC, type ReactNode } from "react";

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
      className="flex w-full justify-between"
    >
      {children}
    </button>
  );
};

interface SettingButtonContentProps {
  action: string;
  title: ReactNode | string;
}

const SettingButtonContent: FC<SettingButtonContentProps> = ({
  title,
  action,
}) => {
  return (
    <>
      <span className="flex items-center text-gray-900">{title}</span>
      <span className="block text-sm text-gray-500 hover:text-gray-900">
        {action}
      </span>
    </>
  );
};

export { SettingButton, SettingButtonContent };
