import type { FC } from "react";

interface GroupCardHeaderProps {
  title: string;
  label: string;
}

const GroupCardHeader: FC<GroupCardHeaderProps> = ({ label, title }) => {
  return (
    <>
      <p className="mb-5 text-sm text-gray-400">
        <span className="mr-2 text-3xl font-bold text-gray-800">{title}</span>
        {label}
      </p>
    </>
  );
};

export default GroupCardHeader;
