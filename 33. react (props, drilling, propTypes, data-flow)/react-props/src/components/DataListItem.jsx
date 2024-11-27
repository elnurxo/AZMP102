import PropTypes from "prop-types";

const DataListItem = ({ item }) => {
  return <li>{item.name}</li>;
};

DataListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType[(PropTypes.number, PropTypes.string)],
    name: PropTypes.string,
  }),
};

export default DataListItem;
