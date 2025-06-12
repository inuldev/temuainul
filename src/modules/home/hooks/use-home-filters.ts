import { parseAsInteger, useQueryStates } from "nuqs";

import { DEFAULT_PAGE } from "@/constants";

export const useHomeFilters = () => {
  return useQueryStates({
    meetingsPage: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
};
