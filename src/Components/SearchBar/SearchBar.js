import { useState } from "react";
import s from "./SearchBar.module.css";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";

function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const location = useLocation();

  const handleQueryChange = (e) => {
    setQuery(e.target.value.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      return toast.error("Enter your query!");
    }
    history.push({ ...location, search: `query=${query}` });
    onSubmit(query);
    setQuery("");
  };

  return (
    <div>
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            name="query"
            value={query}
            onChange={handleQueryChange}
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
          />
        </form>
      </header>
    </div>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
