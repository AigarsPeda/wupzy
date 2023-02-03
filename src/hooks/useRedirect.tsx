import { useRouter } from "next/router";

const useRedirect = () => {
  const router = useRouter();

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

  return { redirectToPath };
};

export default useRedirect;
