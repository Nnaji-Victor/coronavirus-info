import AllCountriesList from "components/AllCountriesList ";
import { Grid, GridContainer } from "components/Grid";
import WorldSummary from "components/WorldSummary";
import React from "react";
import styled from "styled-components";
import media from "styles/media";

const HomePage = () => {
  return (
    <StyledHomePage>
      <Grid>
        <GridContainer className="homepage-content">
          <WorldSummary />
        </GridContainer>
      </Grid>
      <Grid>
        <GridContainer className="homepage-content">
          <AllCountriesList />
        </GridContainer>
      </Grid>
    </StyledHomePage>
  );
};

const StyledHomePage = styled.section`
  background: var(--secondary-color);
  height: 65rem;
  min-height: 65rem;
  color: var(--text-color);

  .homepage-content {
    height: 100%;
    /* justify-content: center; */
    ${media.phablet`
      margin-top: 5rem;
    `}
  }
`;

export default HomePage;
