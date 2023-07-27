import React from "react";
import { PropTypes } from "prop-types";

const TableHeader = ({ onSort, sortBy, columns }) => {
    const handleSort = (item) => {
        if (sortBy.iter === item && sortBy.order === "asc") {
            onSort({ iter: item, order: "desc" });
        } else {
            onSort({ iter: item, order: "asc" });
        }
    };
    const renderSortArrow = (sortBy, currentPath) => {
        if (sortBy.iter === currentPath) {
            if (sortBy.order === "asc") {
                return <i className="bi bi-caret-down-fill"></i>;
            } else {
                return <i className="bi bi-caret-up-fill"></i>;
            }
        }
        return null;
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => {
                    let iterator; // undefined
                    let sortArrow;
                    if (columns[column].path) {
                        iterator = () => handleSort(columns[column].path);
                    }
                    return (
                        <th
                            key={column}
                            onClick={iterator}
                            // ???
                            {...{ role: columns[column].path && "button" }}
                            scope="col"
                        >
                            {columns[column].name}
                            {iterator &&
                                renderSortArrow(sortBy, columns[column].path)}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    sortBy: PropTypes.object.isRequired, // selectedSort
    columns: PropTypes.object.isRequired
};

export default TableHeader;
