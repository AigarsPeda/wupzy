import type { InputErrorType } from "components/elements/Input/Input";
import handleInputError from "utils/handleInputError";
import isEmail from "utils/isEmail";

type LoginFormType = {
  form: {
    email: string;
    password: string;
  };
  error: InputErrorType[];
};

const loginReducer = (
  state: LoginFormType,
  newState: Partial<LoginFormType>
) => {
  let errors = [...state.error];

  // validate email
  if (newState?.form?.email) {
    const error = !isEmail(newState?.form?.email)
      ? {
          field: "email",
          message: "Invalid email",
        }
      : null;

    errors = handleInputError(error, errors, "email");
  }

  if (!newState?.form?.email) {
    errors = errors.filter((e) => e.field !== "email");
  }

  // validate password
  if (newState.form?.password) {
    const error =
      newState?.form?.password.length <= 5
        ? {
            field: "password",
            message: "Password must be at least 6 characters",
          }
        : null;

    errors = handleInputError(error, errors, "password");
  }

  if (!newState?.form?.password) {
    errors = errors.filter((e) => e.field !== "password");
  }

  return { ...state, ...newState, error: errors };
};

export default loginReducer;
