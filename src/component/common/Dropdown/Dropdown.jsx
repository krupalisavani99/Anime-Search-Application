import React from "react";
import PropTypes from "prop-types";
import "./Dropdown.css";

const Dropdown = ({ options, onChange, placeholder, displayKey }) => {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="dropdown-input"
    >
      <option value="">{placeholder}</option>
      {options.map((option, index) => (
        <option key={index} value={option[displayKey]}>
          {option[displayKey]}
        </option>
      ))}
    </select>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  placeholder: "Select an option",
};

export default Dropdown;
