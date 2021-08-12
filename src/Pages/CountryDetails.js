import React from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { Grid, GridContainer } from "components/Grid";
import { theme } from "styles";
import DatePicker from "components/DatePicker";
import { get_analog_date } from "_utils/get_date";
import { client } from "_utils/api-client";
import CountryDetailHero from "components/CountryDetailHero";
import DailyGraph from "components/DailyGraph";

const CountryDetails = () => {
  const [details, setDetails] = React.useState("");
  const [dates, setDates] = React.useState("");

  let history = useHistory();

  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let { countryId } = useParams();

  let dataArray = countryId.split("-");
  let iso = dataArray.pop();
  let country = dataArray.join(" ");
  countryId = dataArray.join("-");

  const handleDateSelection = React.useCallback(
    (date) => {
      const { endDate, startDate } = date[0];
      const end_date = get_analog_date(endDate);
      const start_date = get_analog_date(startDate);
      setDates({ start_date, end_date });
      const result = client(
        `total/country/${countryId}?from=${start_date}&to=${end_date}`
      ).then((data) => data);
      result.then((res) => setDetails(res));
    },
    [countryId]
  );

  return (
    <>
      <StyledCountryDetail>
        <GridContainer>
          <div className="top-row">
            <div onClick={history.goBack} className="back-button">
              {" "}
              ← Back{" "}
            </div>
            <div className="date-range-container">
              <DatePicker getDate={handleDateSelection} />
            </div>
          </div>
          <h1 className="country-detail">
            <span className="country-flag">
              <img
                src={`https://www.countryflags.io/${iso}/flat/64.png`}
                alt="country flag"
              />
            </span>
            <span className="country">{country}</span>
          </h1>
          <CountryDetailHero
            details={details}
            dates={dates}
            country={country}
          />
        </GridContainer>
      </StyledCountryDetail>

      <Grid>
        <GridContainer>
          <DailyGraph country={countryId}/>
        </GridContainer>
      </Grid>
    </>
  );
};

const StyledCountryDetail = styled(Grid)`
  background: var(--secondary-color);
  height: 65rem;
  min-height: 65rem;
  padding-top: 5rem;
  color: var(--text-color);

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .back-button {
      font-size: 1.7rem;
      cursor: pointer;
    }
  }

  .country-detail {
    text-align: center;
    margin-top: 8rem;
    font-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;

    .country {
      text-transform: capitalize;
      font-size: 4rem;
      font-weight: 700;
      font-family: ${theme.fonts.Helvetica};
      margin-left: 2rem;
    }
  }
`;

export default CountryDetails;
