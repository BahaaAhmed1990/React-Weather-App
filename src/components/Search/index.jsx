import React from "react";

export default function Search({
  searchParam,
  setSearchParam,
  onHandleSearch,
}) {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={searchParam}
        onChange={(event) => setSearchParam(event.target.value)}
      />
      <button onClick={onHandleSearch}>Search</button>
    </div>
  );
}
