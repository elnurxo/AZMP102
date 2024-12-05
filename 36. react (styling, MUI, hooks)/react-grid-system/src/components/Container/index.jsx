import styled from "styled-components";
import PropTypes from "prop-types";

const StyledContainer = styled.div`
  width: ${(props) => (props.fluid ? "100%" : "80%")};
  margin: 0 auto;
  border: 1px solid black;
`;

const Container = ({ children, fluid }) => {
  return <StyledContainer fluid={fluid}>{children}</StyledContainer>;
};

Container.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  fluid: PropTypes.bool,
};

export default Container;
