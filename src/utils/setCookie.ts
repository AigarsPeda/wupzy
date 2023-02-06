// set cookie with name and token
const setCookie = (name: string, value: string, days: number) => {
  // const expires = new Date(Date.now() + days * 864e5).toUTCString();
  // document.cookie =
  //   name + "=" + encodeURIComponent(value) + "; expires=" + expires;

  // set cookie with name and token and check if it set
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie =
    name + "=" + encodeURIComponent(value) + "; expires=" + expires;
  if (document.cookie) {
    console.log("cookie set");
  }
};

export default setCookie;
