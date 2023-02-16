import { useRouter } from "next/router";
import { useEffect } from "react";

const useRedirect = () => {
  const router = useRouter();

  // return current path
  const getCurrentPath = () => {
    return router.pathname;
  };

  // go back to previous page
  const goBack = () => {
    router.back();
  };

  const redirectToPath = (path: string, isRedirectQuery = false) => {
    router
      .push({
        pathname: path,
        // if isRedirectQuery is true, add redirect query to the path to redirect to after login
        ...(isRedirectQuery && {
          query: {
            redirect: router.pathname,
          },
        }),
      })
      .catch((err) => console.error(err));
  };

  return { goBack, getCurrentPath, redirectToPath };
};

export default useRedirect;
