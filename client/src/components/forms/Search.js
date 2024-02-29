import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/shop?${text}`);
  };

  return (
    <div className="bg-light input-wrapper">
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
        <FaSearch
          style={{ marginLeft: "10px", marginRight: "3px" }}
          id="search-icon"
        />
        <input
          type="search"
          placeholder="Type to search..."
          value={text}
          className="bg-light"
          style={{ height: "50px", width: "500px" }}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Search;
