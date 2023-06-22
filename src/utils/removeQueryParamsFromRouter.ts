import { type NextRouter } from "next/router";

const removeQueryParamsFromRouter = (
  router: NextRouter,
  removeList: string[]
) => {
  if (removeList.length > 0) {
    removeList.forEach((param) => delete router.query[param]);
  } else {
    Object.keys(router.query).forEach((param) => delete router.query[param]);
  }
  router
    .replace(
      {
        pathname: router.pathname,
        query: router.query,
      },
      undefined,
      { shallow: true }
    )
    .catch((err) =>
      console.error("Error removing query params from router", err)
    );
};

export default removeQueryParamsFromRouter;
