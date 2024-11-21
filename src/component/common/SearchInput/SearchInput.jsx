import React from "react";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <TextField
      sx={{
        "& .MuiOutlinedInput-input": {
          borderColor: "lightgray",
          padding: "10px",
          borderRadius: "10px",
          fontSize: "12px",
          color: "gray",
        },
      }}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      variant="outlined"
      size="small"
      fullWidth
      // InputProps={{
      //   startAdornment: (
      //     <div
      //       style={{ marginRight: 8, display: "flex", alignItems: "center" }}
      //     >
      //       <SearchIcon style={{ color: "gray" }} />
      //     </div>
      //   ),
      // }}
    />
  );
};

export default SearchInput;
