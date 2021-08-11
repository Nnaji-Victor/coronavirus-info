import React from "react";
import styled from "styled-components";
import { theme } from "styles";
import media from "styles/media";

const Heading = ({ type, size, children }) => {
  let HeadingType = "h6";
  if (type) {
    switch (type) {
      case "h1":
        HeadingType = "h1";
        break;
      case "h2":
        HeadingType = "h2";
        break;
      case "h3":
        HeadingType = "h3";
        break;
      case "h4":
        HeadingType = "h4";
        break;
      case "h5":
        HeadingType = "h5";
        break;
      case "h6":
        HeadingType = "h6";
        break;
      default:
        break;
    }
  }

  const StyledHeading = styled(HeadingType)`
    font-size: ${size === "large" ? "6.5rem" : "5rem"};
    font-weight: 900;
    font-family: ${theme.fonts.Helvetica};
    ${media.phablet`
         font-size: ${size === "large" ? "4.5rem" : "3rem"};
    `}
  `;
  return <StyledHeading>{children}</StyledHeading>;
};

export default Heading;
