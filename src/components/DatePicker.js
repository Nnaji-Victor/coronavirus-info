import React, { useState } from "react";
import styled from "styled-components";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { theme } from "styles";
import { addDays } from "date-fns";

const DatePicker = ({ getDate }) => {
  const [active, setActive] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date("2020 AUG 04"),
      endDate: addDays(new Date("2020 AUG 14"), 7),
      key: "selection",
    },
  ]);

  const get_date = React.useCallback((...args) => {
    return getDate(...args);
  }, [getDate])

  React.useEffect(() => {
    get_date(state);
  }, [get_date, state]);


  const handleButtonClick = () => {
    setActive((value) => !value);
  };

  return (
    <StyledDateRange>
      <button className="date-button" onClick={handleButtonClick}>
        Select Date
      </button>
      {active && (
        <>
          <DateRange
            className="date-picker"
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
          <div className="blur-bg" onClick={handleButtonClick}></div>
        </>
      )}
    </StyledDateRange>
  );
};

const StyledDateRange = styled.div`
  position: relative;

  .date-button {
    padding: 1.2rem 4rem;
    cursor: pointer;
    background-color: rgb(0, 147, 213);
    color: #fff;
    border: none;
    font-family: ${theme.fonts.Helvetica};
    border-radius: 0.7rem;
    font-size: 1.4rem;
    font-weight: 700;
  }
  .date-picker {
    position: absolute;
    right: -10rem;
    z-index: 10;
  }

  .blur-bg {
    position: fixed;
    background-color: var(--text-color);
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    z-index: 5;
    opacity: 0.8;
  }
`;

export default DatePicker;
