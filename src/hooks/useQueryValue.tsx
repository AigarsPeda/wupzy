import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const useQueryValue = (initialValue: string, queryKey: string) => {
  const router = useRouter();
  const [selectedValue, setSelectedValue] = useState(initialValue);

  const updateSelectedValue = useCallback(
    (value: string) => {
      router
        .push(
          {
            pathname: router.pathname,
            query: { ...router.query, [queryKey]: value },
          },
          undefined,
          { shallow: true },
        )
        .catch((err) => console.error("Error while updating query: ", err));
    },
    [queryKey, router],
  );

  useEffect(() => {
    const queryValue = router.query[queryKey];

    if (queryValue && typeof queryValue === "string") {
      setSelectedValue(queryValue);
    } else {
      updateSelectedValue(initialValue);
    }
  }, [
    queryKey,
    router.query,
    initialValue,
    setSelectedValue,
    updateSelectedValue,
  ]);

  return [selectedValue, updateSelectedValue] as const;
};

export default useQueryValue;
