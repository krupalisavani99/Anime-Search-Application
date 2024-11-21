import React, { useState, useEffect } from "react";
import NavTabs from "../common/Tabs/NavTabs";
import useFetch from "../../hooks/useFetch";
import Dropdown from "../common/Dropdown/Dropdown";
import DataTable from "../common/DataTable/DataTable";
import SearchInput from "../common/SearchInput/SearchInput";
import { Chip, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../App.css";

const Layout = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const {
    data: animeData,
    loading,
    error,
  } = useFetch("https://api.jikan.moe/v4/anime");

  useEffect(() => {
    if (animeData) {
      const filtered = animeData.filter((anime) => {
        const matchesTab =
          !selectedTab ||
          anime.status?.toLowerCase() === selectedTab.toLowerCase();
        const matchesType =
          !selectedType ||
          anime.type?.toLowerCase() === selectedType.toLowerCase();
        const matchesSearch =
          !searchQuery ||
          anime.title.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesTab && matchesType && matchesSearch;
      });
      setFilteredData(filtered);
    }
  }, [animeData, selectedTab, selectedType, searchQuery]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleDropdownChange = (value) => {
    setSelectedType(value);
  };

  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  const handleChipDelete = (chipType) => {
    if (chipType === "type") {
      setSelectedType("");
    } else if (chipType === "tab") {
      setSelectedTab("");
    } else if (chipType === "title") {
      setSearchQuery("");
    }
  };

  const handleClearFilters = () => {
    setSelectedTab("");
    setSelectedType("");
    setSearchQuery("");
    setFilteredData(animeData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="header-container">
        <NavTabs
          tabData={Array.from(
            new Set(animeData.map((anime) => anime.status))
          ).map((status) => ({ status }))}
          onTabChange={handleTabChange}
        />

        <div className="search-container">
          <Dropdown
            options={Array.from(
              new Set(animeData.map((anime) => anime.type))
            ).map((type) => ({ type }))}
            onChange={handleDropdownChange}
            placeholder="Type"
            displayKey="type"
          />

          <SearchInput
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Anime"
          />
        </div>

        <div className="chip-container">
          {selectedType && (
            <Chip
              label={`Type: ${selectedType}`}
              onDelete={() => handleChipDelete("type")}
              className="filtered-chip"
            />
          )}
          {selectedTab && (
            <Chip
              label={`Tab: ${selectedTab}`}
              onDelete={() => handleChipDelete("tab")}
              className="filtered-chip"
            />
          )}
          {searchQuery && (
            <Chip
              label={`Title: ${searchQuery}`}
              onDelete={() => handleChipDelete("title")}
              className="filtered-chip"
            />
          )}
          {(selectedTab || selectedType || searchQuery) && (
            <Button
              onClick={handleClearFilters}
              variant="text"
              color="error"
              startIcon={<DeleteIcon />}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {filteredData.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "16px" }}>
          No characters or anime found.
        </p>
      ) : (
        <DataTable filteredData={filteredData} />
      )}
    </div>
  );
};

export default Layout;
