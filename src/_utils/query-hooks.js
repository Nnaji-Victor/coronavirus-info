import React from "react";
import { useQuery, useQueryClient } from "react-query";
import { useClient } from "./use-client";

function useAllWorldSummary() {
  const client = useClient();
  const { data } = useQuery({
    queryKey: "all-world-summary",
    queryFn: () => client(`world`).then((data) => data),
  });

  return data;
}

function useWorldSummary() {
  const client = useClient();
  const { data: WorldSummary } = useQuery({
    queryKey: "country-summary",
    queryFn: () => client(`summary`).then((data) => data.Global),
  });

  return WorldSummary;
}

const getcountriesConfig = (client, queryCache) => ({
  queryKey: ["countries"],
  queryFn: () => client(`countries`).then((data) => data),
  onSuccess(countries) {
    for (const country of countries) {
      queryCache.setQueryData(["country", { bookId: country.slug }], country);
    }
  },
});

const loadingCountry = {
  "Country": "loading...",
  "Slug": "loading...",
  "ISO2": "loading...,"
};

function useCountries() {
  const queryCache = useQueryClient();
  const client = useClient();
  const result = useQuery(getcountriesConfig(client, queryCache));

  return { ...result, countries: result.data ? result.data : loadingCountry };
}

const useRefetchCountries = () =>{
  const client = useClient();
  return React.useCallback(async function refetchBookSearchQuery(queryCache){
    queryCache.removeQueries('countries');
    await queryCache.prefetchQuery(getcountriesConfig(client, queryCache))
  
  },[client])
}

export { useAllWorldSummary, useWorldSummary, useCountries, useRefetchCountries };
