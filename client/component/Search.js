import React from "react";

const Search = ({ onSearch }) => {
  return (
    <>
      <div className="input-group rounded">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={onSearch}
        />
      </div>
    </>
  );
};

export default Search;
