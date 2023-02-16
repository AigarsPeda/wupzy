const getInputType = (key: string) => {
  if (key === "confirmPassword") return "password";
  if (key === "firstName") return "text";
  if (key === "lastName") return "text";
  return key;
};

export default getInputType;
