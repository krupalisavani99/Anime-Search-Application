import React from "react";
import NavTabs from "../common/Tabs/NavTabs";
import useFetch from "../../hooks/useFetch";
import Dropdown from "../common/Dropdown/Dropdown";
import DataTable from "../common/DataTable/DataTable";
import SearchInput from "../common/SearchInput/SearchInput";
import { Chip, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import useFilteredData from "../../hooks/useFilteredData";
import "../../App.css";

const Layout = () => {
  const {
    data: animeData,
    loading,
    error,
  } = useFetch("https://api.jikan.moe/v4/anime");

  const { filteredData, filters, updateFilter, clearFilters } =
    useFilteredData(animeData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="header-container">
        <NavTabs
          tabData={Array.from(
            new Set(animeData.map((anime) => anime.status))
          ).map((status) => ({
            status,
          }))}
          onTabChange={(tab) => updateFilter("tab", tab)}
        />

        <div className="search-container">
          <Dropdown
            options={Array.from(
              new Set(animeData.map((anime) => anime.type))
            ).map((type) => ({
              type,
            }))}
            onChange={(value) => updateFilter("type", value)}
            placeholder="Type"
            displayKey="type"
          />

          <SearchInput
            value={filters.search}
            onChange={(value) => updateFilter("search", value)}
            placeholder="Search Anime"
          />
        </div>

        <div className="chip-container">
          {filters.type && (
            <Chip
              label={`Type: ${filters.type}`}
              onDelete={() => updateFilter("type", "")}
              className="filtered-chip"
            />
          )}
          {filters.tab && (
            <Chip
              label={`Tab: ${filters.tab}`}
              onDelete={() => updateFilter("tab", "")}
              className="filtered-chip"
            />
          )}
          {filters.search && (
            <Chip
              label={`Title: ${filters.search}`}
              onDelete={() => updateFilter("search", "")}
              className="filtered-chip"
            />
          )}
          {(filters.tab || filters.type || filters.search) && (
            <Button
              onClick={clearFilters}
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
