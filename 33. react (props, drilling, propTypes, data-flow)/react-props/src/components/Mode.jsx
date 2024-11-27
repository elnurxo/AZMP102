import PropTypes from "prop-types";

const Mode = ({ darkMode, setDarkMode }) => {
    
  return (
    <section
      style={{
        width: "70%",
        height: "500px",
        margin: "0 auto",
        border: "2px solid black",
        background: darkMode ? "black" : "white",
        color: darkMode ? "white" : "black",
      }}
    >
      <button
        onClick={() => {
          setDarkMode((currentMode) => {
            return !currentMode;
          });
        }}
        style={{
          display: "block",
          margin: "40px auto",
          padding: "12px 14px",
          borderRadius: "5px",
          cursor: "pointer",
          backgroundColor: darkMode ? "white" : "black",
          color: darkMode ? "black" : "white",
        }}
      >
        CHANGE MODE TO {darkMode ? "LIGHT" : "DARK"}
      </button>
    </section>
  );
};

Mode.propTypes = {
  darkMode: PropTypes.bool,
  setDarkMode: PropTypes.func,
};

export default Mode;
