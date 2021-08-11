import styled from "styled-components";

const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(var(--cols), var(--gridSize));
  grid-gap: 0px;
`;

const GridContainer = styled.div`
  grid-column: 2/12;
`;

const GridContainerFluid = styled.div`
  grid-column: 1/-1;
`;

export { Grid, GridContainer, GridContainerFluid };
