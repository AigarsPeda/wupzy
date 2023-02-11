import type { InputErrorType } from "components/elements/Input/Input";

const handleInputError = (
  error: InputErrorType | null,
  errors: InputErrorType[],
  field: string
) => {
  if (error) {
    // add error if it doesn't exist
    if (!errors.find((e) => e.field === field)) {
      errors.push(error);
    }
  }

  if (!error) {
    errors = errors.filter((e) => e.field !== field);
  }

  return errors;
};

export default handleInputError;
