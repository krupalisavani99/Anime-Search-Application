import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import PropTypes from "prop-types";
import "./NavTabs.css";

const NavTabs = ({ tabData, onTabChange }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(tabData[newValue]?.status || "");
    }
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="status tabs"
        className="tabs-container"
      >
        {tabData?.map((item, index) => (
          <Tab key={index} label={item.status || "Unknown"} className="tabs-label"/>
        ))}
      </Tabs>
    </Box>
  );
};

NavTabs.propTypes = {
  tabData: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default NavTabs;
