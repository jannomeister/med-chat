import React from "react";
import { useStyle } from "../../style";
import { styles } from "./searchFormStyles";

const SearchForm = ({
  onSubmit,
  placeholder,
  searchFormClassName,
  setValue,
  value,
  autoFocus,
}) => {
  useStyle("SearchForm", styles);

  return (
    <form
      data-testid="SearchFormForm"
      onSubmit={onSubmit}
      autoComplete="off"
      className={`reactGiphySearchbox-searchForm-form${
        searchFormClassName ? ` ${searchFormClassName}` : ""
      }`}
    >
      <input
        data-testid="SearchFormInput"
        type="text"
        placeholder={placeholder}
        onChange={setValue}
        value={value}
        name="search"
        className="reactGiphySearchbox-searchForm-input"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus={autoFocus}
      />
    </form>
  );
};
export default SearchForm;
