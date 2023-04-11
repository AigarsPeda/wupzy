const isEmail = (email: string): boolean => {
  // test email string without using regex
  const emailArray = email.split("@");
  if (emailArray.length !== 2) return false;
  const [username, domain] = emailArray;
  if (username?.length === 0 || domain?.length === 0) return false;
  const domainArray = domain?.split(".");
  if (domainArray?.length !== 2) return false;
  const [domainName, domainExtension] = domainArray;
  if (domainName?.length === 0 || domainExtension?.length === 0) return false;
  return true;
};

export default isEmail;
