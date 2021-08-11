import React from "react";
import styled from "styled-components";
import media from "styles/media";
import { get_date, get_default_date } from "_utils/get_date";
import { useAllWorldSummary, useWorldSummary } from "_utils/query-hooks";
import { StackedBarChart } from "./Bar";
import { Grid } from "./Grid";
import Heading from "./Heading";

// const data = [
//   { year: 1980, efficiency: 24.3, sales: 8949000 },

//   { year: 1985, efficiency: 27.6, sales: 10979000 },

//   { year: 1990, efficiency: 28, sales: 9303000 },

//   { year: 1991, efficiency: 28.4, sales: 8185000 },

//   { year: 1992, efficiency: 27.9, sales: 8213000 },

//   { year: 1993, efficiency: 28.4, sales: 8518000 },

//   { year: 1994, efficiency: 28.3, sales: 8991000 },

//   { year: 1995, efficiency: 28.6, sales: 8620000 },

//   { year: 1996, efficiency: 28.5, sales: 8479000 },

//   { year: 1997, efficiency: 28.7, sales: 8217000 },

//   { year: 1998, efficiency: 28.8, sales: 8085000 },

//   { year: 1999, efficiency: 28.3, sales: 8638000 },

//   { year: 2000, efficiency: 28.5, sales: 8778000 },

//   { year: 2001, efficiency: 28.8, sales: 8352000 },

//   { year: 2002, efficiency: 29, sales: 8042000 },

//   { year: 2003, efficiency: 29.5, sales: 7556000 },

//   { year: 2004, efficiency: 29.5, sales: 7483000 },

//   { year: 2005, efficiency: 30.3, sales: 7660000 },

//   { year: 2006, efficiency: 30.1, sales: 7762000 },

//   { year: 2007, efficiency: 31.2, sales: 7562000 },

//   { year: 2008, efficiency: 31.5, sales: 6769000 },

//   { year: 2009, efficiency: 32.9, sales: 5402000 },

//   { year: 2010, efficiency: 33.9, sales: 5636000 },

//   { year: 2011, efficiency: 33.1, sales: 6093000 },

//   { year: 2012, efficiency: 35.3, sales: 7245000 },

//   { year: 2013, efficiency: 36.4, sales: 7586000 },

//   { year: 2014, efficiency: 36.5, sales: 7708000 },

//   { year: 2015, efficiency: 37.2, sales: 7517000 },

//   { year: 2016, efficiency: 37.7, sales: 6873000 },

//   { year: 2017, efficiency: 39.4, sales: 6081000 },
// ];

const WorldSummary = () => {
  const wordSummary = useWorldSummary();
  let allWorldSummary = useAllWorldSummary();

  let data =
    allWorldSummary &&
    allWorldSummary
      .sort((a, b) => new Date(a.Date) - new Date(b.Date))
      .map((data) => {
        let date = get_default_date(data.Date);
        let recovered = data.TotalRecovered;
        let deaths = data.TotalDeaths;
        return { date, recovered, deaths };
      });

  const keys = ["recovered", "deaths"];
  const colors = {
    recovered: "#596ab0",
    deaths: "#ca6c87",
  };

  return (
    <StyledWorldSummary>
      <Grid className="summary-grid">
        <div className="text">
          <h2 className="summary-title">
            Global Situation as of 
            <span style={{display: "block", fontWeight: "600", lineHeight: "4rem"}}>{get_date(wordSummary?.Date)}</span>
          </h2>
          <div className="recovered">
            <Heading type="h3" size="large">
              {wordSummary?.TotalConfirmed.toLocaleString()}
            </Heading>
            <span>Confirmed Cases</span>
          </div>

          <div className="recovered">
            <Heading type="h3" size="large">
              {wordSummary?.TotalDeaths.toLocaleString()}
            </Heading>
            <span>Deaths</span>
          </div>
        </div>
        <div className="map">
          {data && data.length > 0 && (
            <StackedBarChart data={data} keys={keys} colors={colors} />
          )}
        </div>
      </Grid>
    </StyledWorldSummary>
  );
};

const StyledWorldSummary = styled.div`
  height: 100%;

  .summary-grid {
    align-content: center;
    ${media.phablet`display: block`}
  }
  .text {
    grid-column: 1/4;
    .summary-title {
      font-size: 3rem;
      ${media.phablet`
        font-size: 2.5rem;
      `}
    }
    .recovered {
      margin-top: 5rem;
      ${media.phablet`margin-top: 3rem`}
      span {
        font-size: 2rem;
        line-height: 4rem;
      }
    }

    ${media.phablet`margin-bottom: 5rem`}
  }

  .map {
    grid-column: 5/12;
  }

  .text,
  .map {
    ${media.phablet`
        width: 100%;
    `}
  }
`;

export default WorldSummary;
