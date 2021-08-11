import { useQuery } from "react-query";
import { useClient } from "./use-client";

function useAllWorldSummary() {
  const client = useClient();
  const { data } = useQuery({
    queryKey: "all-world-summary",
    queryFn: () => client(`world`).then((data) => data),
  });

  return data;
}

function useWorldSummary(){
    const client = useClient();
    const { data: WorldSummary } = useQuery({
        queryKey: "country-summary",
        queryFn: () => client(`summary`).then((data) => data.Global),
    });

    return WorldSummary;
}

export { useAllWorldSummary, useWorldSummary };
