import styled from "styled-components";

const StyledRow = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

// eslint-disable-next-line react/prop-types
const Row = ({ children }) => {
  return <StyledRow>{children}</StyledRow>;
};

export default Row;
