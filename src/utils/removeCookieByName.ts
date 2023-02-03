const removeCookieByName = (name: string) => {
  // get cookie by name and delete it
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};

export default removeCookieByName;
