import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { theme } from "styles";

const AllCountriesContainer = ({ countries }) => {
  return (
    <StyledAllCountriesContainer>
      {countries.map((country) => (
        <Country country={country} key={country.Slug} />
      ))}
    </StyledAllCountriesContainer>
  );
};

const Country = ({ country }) => {
  return (
    <StyledLink to={`country/${country.Slug}`}>
      <div className="country-image">
        <img
          src={`https://www.countryflags.io/${country.ISO2}/flat/64.png`}
          alt="country flag"
        />
      </div>
      <div className="country-name">{country.Country}</div>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
  font-size: 1.4rem;
  color: var(--text-color);
  text-transform: uppercase;
  background-color: #fff;
  margin-bottom: 2rem;
  padding: 0 1rem;
  border-radius: 0.3rem;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .country-image {
    border-radius: 50%;
  }

  .country-name {
    margin-left: 1rem;
    font-family: ${theme.fonts.Helvetica};
    line-height: 1.8rem;
  }
`;

const StyledAllCountriesContainer = styled.div`
  height: 70rem;
  overflow: scroll;
  padding: 3rem;
  margin-bottom: 10rem;
  background-color: var(--secondary-color);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 25rem));
  grid-column-gap: 3rem;
  justify-content: center;
`;

export default AllCountriesContainer;
