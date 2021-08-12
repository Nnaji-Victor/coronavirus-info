import React from "react";
import { useQueryClient } from "react-query";
import styled from "styled-components";
import media from "styles/media";
import { useCountries, useRefetchCountries } from "_utils/query-hooks";
import AllCountriesContainer from "./AllCountriesContainer";
import Heading from "./Heading";
import Loading from "./Loading";

const AllCountriesList = () => {
  const queryCache = useQueryClient();
  const { countries,isLoading, isError, isSuccess } = useCountries();
  const refetchCountries = useRefetchCountries();

  React.useEffect(() => {
    return () => {
      refetchCountries(queryCache);
    };
  }, [queryCache, refetchCountries]);

  return (
    <StyledCountriesList>
      <Heading> Situation by Countries </Heading>
      <div className="countries-container">
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div>there was an error</div>
        ) : (
          isSuccess &&
          (countries.length ? (
            <AllCountriesContainer countries={countries} />
          ) : (
            <p>No country found. Please refresh the browser.</p>
          ))
        )}
      </div>
    </StyledCountriesList>
  );
};

const StyledCountriesList = styled.section`
  margin-top: 10rem;
  ${media.phablet`margin-top: 5rem`}
  .countries-container {
    margin-top: 3.5rem;
  }
`;
export default AllCountriesList;
