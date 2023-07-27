import React from "react";
import PropTypes from "prop-types";
// import _ from "lodash";

const Pagination = (props) => {
    const { itemsCount, itemsPerPage, onPageChange, currentPage } = props;

    // используя lodash ... очень просто создать массив
    // const pageNumbers = _.range(1, Math.ceil(itemsCount / itemsPerPage)+1)
    const pageCount = Math.ceil(itemsCount / itemsPerPage);

    // здесь по условию мы выходим из функции Pagination со значением Null
    // код дальше выполняться не будет
    if (pageCount === 1) return null;

    // ----------------------------------------

    const pageNumbers = [];
    for (let i = 1; i <= pageCount; i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    {pageNumbers.map((page) => {
                        return (
                            <li
                                key={page}
                                className={
                                    "page-item" +
                                    (page === currentPage ? " active" : "")
                                }
                            >
                                <a
                                    onClick={() => onPageChange(page)}
                                    className="page-link"
                                >
                                    {page}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};

Pagination.propTypes = {
    itemsCount: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
