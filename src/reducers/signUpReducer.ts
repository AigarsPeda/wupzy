const emailRegex = new RegExp(
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
);

type SignUpFormError = {
  field: string;
  message: string;
};

type SignUpFormType = {
  form: {
    email: string;
    lastName: string;
    password: string;
    firstName: string;
    confirmPassword: string;
  };
  error: SignUpFormError[];
};

const signUpReducer = (
  state: SignUpFormType,
  newState: Partial<SignUpFormType>
) => {
  // validate email
  if (newState?.form?.email) {
    const error =
      !emailRegex.test(newState?.form?.email) &&
      newState?.form?.email.length > 0
        ? {
            field: "email",
            message: "Invalid email",
          }
        : null;

    return {
      ...state,
      ...newState,
      error: error
        ? [...state.error.filter((e) => e.field !== "email"), error]
        : state.error.filter((e) => e.field !== "email"),
    };
  }

  // validate password
  if (newState?.form?.password) {
    const error =
      newState?.form?.password.length <= 5
        ? {
            field: "password",
            message: "Password must be at least 6 characters",
          }
        : null;

    return {
      ...state,
      ...newState,
      error: error
        ? [...state.error.filter((e) => e.field !== "password"), error]
        : state.error.filter((e) => e.field !== "password"),
    };
  }

  // validate confirm password
  if (newState?.form?.confirmPassword) {
    const error =
      newState?.form?.confirmPassword !== state.form.password
        ? {
            field: "confirmPassword",
            message: "Passwords do not match",
          }
        : null;

    return {
      ...state,
      ...newState,
      error: error
        ? [...state.error.filter((e) => e.field !== "confirmPassword"), error]
        : state.error.filter((e) => e.field !== "confirmPassword"),
    };
  }

  // validate first name
  if (newState?.form?.firstName) {
    const error =
      newState?.form?.firstName.length <= 2
        ? {
            field: "firstName",
            message: "First name and last name must be at least 2 characters",
          }
        : null;

    return {
      ...state,
      ...newState,
      error: error
        ? [...state.error.filter((e) => e.field !== "firstName"), error]
        : state.error.filter((e) => e.field !== "firstName"),
    };
  }

  // validate last name
  if (newState?.form?.lastName) {
    const error =
      newState?.form?.lastName && newState.form.lastName.length <= 2
        ? {
            field: "lastName",
            message: "First name and last name must be at least 2 characters",
          }
        : null;

    return {
      ...state,
      ...newState,
      error: error
        ? [...state.error.filter((e) => e.field !== "lastName"), error]
        : state.error.filter((e) => e.field !== "lastName"),
    };
  }

  return { ...state, ...newState };
};

export default signUpReducer;
