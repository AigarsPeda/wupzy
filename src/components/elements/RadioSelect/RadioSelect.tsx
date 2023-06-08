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
    <div className="flex items-center gap-x-3">
      <input
        type="radio"
        id={radioValue}
        name={radioName}
        value={radioValue}
        disabled={isDisabled}
        checked={radioValue === radioSelectedValue}
        className="h-4 w-4 border-gray-300 text-indigo-600 accent-gray-900 focus:ring-gray-600"
        onChange={(e) => handleRadioChange(e.target.value)}
      />
      <label
        htmlFor={radioValue}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {radioTitle}
      </label>
    </div>
  );
};

export default RadioSelect;
