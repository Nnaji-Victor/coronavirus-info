import React from "react";
import styled from "styled-components";
import { theme } from "styles";
import media from "styles/media";
import { get_date } from "_utils/get_date";

const CountryDetailHero = ({ details, dates, country }) => {
 
  const start = get_date(dates.start_date);
  const end = get_date(dates.end_date);

  const confirmed = details.length
    ? details[details.length - 1]["Confirmed"] - details[0]["Confirmed"]
    : 0;

  const death = details.length
    ? details[details.length - 1]["Deaths"] - details[0]["Deaths"]
    : 0;

  const recovered = details.length
    ? details[details.length - 1]["Recovered"] - details[0]["Recovered"]
    : 0;

  const active = details.length
    ? details[details.length - 1]["Active"] - details[0]["Active"]
    : 0;

  return (
    <StyledDeatailHero>
      <p className="info">
        In <span className="blue">{country}</span>, from{" "}
        <span className="blue">{start}</span> to{" "}
        <span className="blue">{end}</span>, there has been{" "}
        <span className="blue">
          {confirmed} total confirmed {confirmed <= 1 ? "case" : "cases"}
        </span>{" "}
        of COVID-19 with <span className="red">{death} deaths</span>. There has
        been <span className="green">{recovered} recovered patients</span> and at this time, <span className="blue">{active} are still active cases</span>
      </p>
    </StyledDeatailHero>
  );
};

const StyledDeatailHero = styled.div`
  width: 80%;
  padding-top: 4rem;
  margin: 0 auto;
  text-align: center;

  ${media.phablet`width: 100%`}

  .info {
    font-size: 2.7rem;
    ${theme.fonts.Helvetica};
    line-height: 4rem;
    .blue,
    .red, .green {
      color: rgb(0, 147, 213);
      font-weight: bold;
      text-transform: capitalize;
    }

    .red {
      color: #ca6c87;
    }

    .green{
        color: #10a778
    }
  }
`;

export default CountryDetailHero;
