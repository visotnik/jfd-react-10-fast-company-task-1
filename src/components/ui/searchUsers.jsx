import React from "react";
import PropTypes from "prop-types";

const SearchUsers = ({ value, onChange }) => {
    return (
        <input
            className="form-control"
            type="text"
            placeholder="Search..."
            name="search"
            value={value}
            onChange={onChange}
        ></input>
    );
};

SearchUsers.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchUsers;
