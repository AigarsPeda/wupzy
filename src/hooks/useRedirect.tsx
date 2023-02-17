import { useRouter } from "next/router";

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
            // if id is provided, add id to the query
            // ...(id && { redirectId: id }),
          },
        }),
      })
      .catch((err) => console.error(err));
  };

  return { goBack, getCurrentPath, redirectToPath };
};

export default useRedirect;
