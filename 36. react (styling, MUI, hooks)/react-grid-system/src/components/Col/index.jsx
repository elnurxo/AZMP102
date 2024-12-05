/* eslint-disable react/prop-types */
import styled from "styled-components";

const StyledColumn = styled.div`
  width: ${(props) => props.size}%;
  padding: 16px 0px;
`;

const Col = ({ children, size }) => {
  return <StyledColumn size={size}>{children}</StyledColumn>;
};

export default Col;
