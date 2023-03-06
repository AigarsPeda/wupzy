import { forwardRef } from "react";
import classNames from "utils/classNames";

interface EditInputProps {
  value: string;
  className?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Ref = HTMLInputElement;

const EditInput = forwardRef<Ref, EditInputProps>(
  ({ value, className, handleChange }, ref) => (
    <>
      <input
        ref={ref}
        value={value}
        className={classNames(
          "w-full rounded-md bg-gray-50 text-sm text-gray-800 focus:outline-none",
          className && className
        )}
        onChange={handleChange}
      />
    </>
  )
);

EditInput.displayName = "EditInput";

export default EditInput;
