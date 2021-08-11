import Logo from "Assets/Logo";
import React from "react";
import styled from "styled-components";
import { Grid, GridContainer } from "./Grid";
import { Link } from "react-router-dom";
import { theme } from "../styles";
import media from "styles/media";

const Navbar = () => {
  return (
    <StyledNavBar>
      <GridContainer>
        <Link to="/" className="logo-container" aria-label="Logo">
          <span className="logo">
            <Logo />
          </span>
          <span className="logo-title">CoronaTrackr</span>
        </Link>
      </GridContainer>
    </StyledNavBar>
  );
};

const StyledNavBar = styled(Grid)`
  padding: 2rem 0;
  ${media.phablet`
      padding: 2.5rem 0;
    `}
  .logo-container {
    text-decoration: none;
    color: currentColor;
    display: flex;
    align-items: center;
    .logo {
      svg {
        height: 5rem;
      }
    }
    .logo-title {
      font-size: 2rem;
      display: inline-block;
      margin-left: 1rem;
      font-weight: 700;
      font-family: ${theme.fonts.Roboto};
      ${media.phablet`
        font-size: 1.4rem;
      `}
    }
  }
`;

export default Navbar;
