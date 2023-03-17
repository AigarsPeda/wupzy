import type { FC } from "react";

interface GroupCardHeaderProps {
  label: string;
  title?: string;
}

const GroupCardHeader: FC<GroupCardHeaderProps> = ({ label, title }) => {
  return (
    <div className="mb-2">
      <div className="h-10">
        {title && (
          <p className="mr-2 text-3xl font-bold text-gray-800">{title}</p>
        )}
      </div>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  );
};

export default GroupCardHeader;
