import PropTypes from "prop-types";

const Button = ({ person, number }) => {
  console.log("props number: ", number);
  return (
    <button
      onClick={() => {
        window.alert(`hey ${person.name}!`);
      }}
    >
      click me
    </button>
  );
};

Button.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
  }),
  number: PropTypes.number,
};

export default Button;
