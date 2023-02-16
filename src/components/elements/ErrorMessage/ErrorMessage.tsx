import type { FC } from "react";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return <p className="text-xs font-semibold text-red-600">{message}</p>;
};

export default ErrorMessage;
