import PropTypes from "prop-types";

const DataList = ({ children }) => {
  return <ul>{children}</ul>;
};

DataList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default DataList;
