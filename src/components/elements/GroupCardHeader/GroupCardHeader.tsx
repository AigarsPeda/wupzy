import type { FC } from "react";

interface GroupCardHeaderProps {
  label: string;
  title?: string;
  options?: JSX.Element;
}

const GroupCardHeader: FC<GroupCardHeaderProps> = ({
  label,
  title,
  options,
}) => {
  return (
    <div className="mb-2">
      <div className="h-10">
        {title && (
          <p className="mr-2 text-3xl font-bold text-gray-800">{title}</p>
        )}
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-sm">{label}</p>
        </div>
        {options && <div>{options}</div>}
      </div>
    </div>
  );
};

export default GroupCardHeader;
