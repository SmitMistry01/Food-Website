import { useState, useEffect } from "react";

export const SearchBox = ({ resdata, onSearch }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // Filter restaurants whenever searchText changes
    const filteredRes = resdata.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    onSearch(filteredRes);
  }, [searchText, resdata, onSearch]);

  return (
    <div className="flex items-center space-x-3">
      <input
        type="text"
        value={searchText}
        placeholder="Search for restaurants..."
        aria-label="Search for restaurants"
        className="w-96 max-w-md p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
        onClick={() => setSearchText("")}
      >
        Clear
      </button>
    </div>
  );
};
