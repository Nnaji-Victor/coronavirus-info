import React from "react";
import styled from "styled-components";
import { theme } from "styles";
import { client } from "_utils/api-client";
import { get_analog_date, get_default_date } from "_utils/get_date";
import DatePicker from "./DatePicker";
import LineGraph from "./LineGraph";

const DailyGraph = ({ country: countryId }) => {
  const [details, setDetails] = React.useState("");

  const handleDateSelection = React.useCallback(
    (date) => {
      const { endDate, startDate } = date[0];
      const end_date = get_analog_date(endDate);
      const start_date = get_analog_date(startDate);
      const result = client(
        `country/${countryId}/status/confirmed?from=${start_date}&to=${end_date}`
      ).then((data) => data);
      result.then((res) => setDetails(res));
    },
    [countryId]
  );

  let data = [];
  for (let i = 1; i < details.length; i++) {
    let cases = details[i]["Cases"] - details[i - 1]["Cases"];
    let date = get_default_date(details[i]["Date"]);
    const result = { cases, date };
    data.push(result);
  }

  return (
    <StyledDailyGraph>
      <div className="top-row">
        <div className="title">New Cases per Day</div>
        <div className="date-picker">
          <DatePicker getDate={handleDateSelection} />
        </div>
      </div>
      <div className="bottom-row">
        <LineGraph
          data={data}
        />
      </div>
    </StyledDailyGraph>
  );
};

const StyledDailyGraph = styled.section`
  margin: 10rem 0;

  .top-row {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 2.4rem;
      text-transform: uppercase;
      font-family: ${theme.fonts.Helvetica};
    }
  }

  .bottom-row {
    margin-top: 8rem;

    svg {
      display: block;
      width: 100%;
      height: 70rem;
      background: #f7f7f7;
      overflow: visible;
    }
  }
`;

export default DailyGraph;
