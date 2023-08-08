import React from "react";

const Search = ({
  searchParams,
  setSearchParams,
  search,
  getterFunction,
  searchPlaceholder,
}) => {
  return (
    <>
      <form onSubmit={search} className="d-flex mb-5" role="search">
        <button type="submit" className="btn btn-dark" onClick={getterFunction}>
          All
        </button>
        <input
          type="search"
          id="search-form"
          className="form-control mx-2"
          placeholder={searchPlaceholder}
          value={searchParams}
          onChange={(event) => {
            setSearchParams(event.target.value);
          }}
        />
        <button className="btn btn-secondary" onClick={search}>
          <i className="fa fa-search fa-lg"></i>
        </button>
      </form>
    </>
  );
};

export default Search;
