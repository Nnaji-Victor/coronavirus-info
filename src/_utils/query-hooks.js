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
  Country: "loading...",
  Slug: "loading...",
  ISO2: "loading...,",
  CountryCode: "loading..",
};

const loadingCountries = Array.from({ length: 10 }, (v, index) => ({
  id: `loading-book-${index}`,
  ...loadingCountry,
}));

function useCountries() {
  const queryCache = useQueryClient();
  const client = useClient();
  const result = useQuery(getcountriesConfig(client, queryCache));

  return { ...result, countries: result.data ? result.data : loadingCountries };
}

const useRefetchCountries = () => {
  const client = useClient();
  return React.useCallback(
    async function refetchBookSearchQuery(queryCache) {
      queryCache.removeQueries("countries");
      await queryCache.prefetchQuery(getcountriesConfig(client, queryCache));
    },
    [client]
  );
};

const useCountryDetails = (countryId, start, end) => {
  const client = useClient();
  const result = useQuery({
    queryKey: ["country", { countryId }],
    queryFn: () => client(`total/country/${countryId}?from=${start}&to=${end}`).then((data) => data),
  });

  // console.log(`total/country/${countryId}?from=${start}&to=${end}`);
  return { ...result, country: result.data ?? loadingCountry };
};

const useCountry = (countryId) => {
  const client = useClient();
  const result = useQuery({
    queryKey: ["country", { countryId }],
    queryFn: () => client(`country/${countryId}`).then((data) => data),
  });

  return { ...result, country: result.data ?? loadingCountries };
};

export {
  useAllWorldSummary,
  useWorldSummary,
  useCountry,
  useCountries,
  useRefetchCountries,
  useCountryDetails,
};
