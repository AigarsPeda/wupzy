import { type FC } from "react";

interface RadioSelectProps {
  radioName: string;
  radioTitle: string;
  radioValue: string;
  isDisabled?: boolean;
  radioSelectedValue: string;
  handleRadioChange: (e: string) => void;
}

const RadioSelect: FC<RadioSelectProps> = ({
  radioName,
  radioTitle,
  radioValue,
  isDisabled,
  handleRadioChange,
  radioSelectedValue,
}) => {
  return (
    <div className="flex items-center space-x-3">
      <input
        type="radio"
        id={radioValue}
        name={radioName}
        value={radioValue}
        disabled={isDisabled}
        checked={radioValue === radioSelectedValue}
        className="h-4 w-4 border-gray-300 accent-gray-900 focus:ring-0 focus:ring-gray-600 focus:ring-offset-0"
        onChange={(e) => handleRadioChange(e.target.value)}
      />
      <label
        htmlFor={radioValue}
        className="block bg-transparent text-sm font-medium leading-6 text-gray-900"
      >
        {radioTitle}
      </label>
    </div>
  );
};

export default RadioSelect;
