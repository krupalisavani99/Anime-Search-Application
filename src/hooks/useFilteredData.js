import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

const useFilteredData = (data) => {
  const [filters, setFilters] = useState({
    tab: "",
    type: "",
    search: "",
  });
  const [filteredData, setFilteredData] = useState([]);
  const debouncedSearch = useDebounce(filters.search, 500);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item) => {
        const matchesTab =
          !filters.tab ||
          item.status?.toLowerCase() === filters.tab.toLowerCase();
        const matchesType =
          !filters.type ||
          item.type?.toLowerCase() === filters.type.toLowerCase();
        const matchesSearch =
          !debouncedSearch ||
          item.title.toLowerCase().includes(debouncedSearch.toLowerCase());

        return matchesTab && matchesType && matchesSearch;
      });
      setFilteredData(filtered);
    }
  }, [data, filters, debouncedSearch]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ tab: "", type: "", search: "" });
  };

  return {
    filteredData,
    filters,
    updateFilter,
    clearFilters,
  };
};

export default useFilteredData;
