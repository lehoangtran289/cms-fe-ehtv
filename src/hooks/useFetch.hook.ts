import { useEffect } from "react";

import useLazyFetch from "./useLazyFetch.hook";

export default function useFetch(input: RequestInfo, init?: RequestInit) {
  const [doFetch, response, { called, error }] = useLazyFetch(input);

  useEffect(() => {
    doFetch(init);
  }, []);

  return [response, { called, error }];
}
