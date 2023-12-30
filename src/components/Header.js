import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title , onAdd , buttonText}) => {

  return (
    <header className="header">
      <h1>{title}</h1>
      <Button 
      text={buttonText? 'Close' : 'Add'} color= {buttonText? 'red' : 'green'} onClick={onAdd} />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.prototype = {
  title: PropTypes.string.isRequired,
};

export default Header;
