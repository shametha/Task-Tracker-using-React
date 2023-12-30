import PropTypes from "prop-types";

const Button = (props) => {
  return (
    <button
      className="btn"
      onClick={props.onClick}
      style={{ backgroundColor: props.color }}
    >
      {props.text}
    </button>
  );
};

Button.defaultProps = {
  color: "blue",
};

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default Button;
