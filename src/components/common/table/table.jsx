import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import PropTypes from "prop-types";
const Table = ({ onSort, sortBy, columns, data, children }) => {
    return (
        <table className="table">
            {/* проверка - если в родительском компоненте есть TableHeader и TableBody то отображаем их,
            если нет, то отображаем наши компонениты TableHeader и TableBody */}
            {children || (
                <>
                    <TableHeader
                        onSort={onSort}
                        sortBy={sortBy}
                        columns={columns}
                    />
                    <TableBody columns={columns} data={data} />
                </>
            )}
        </table>
    );
};

Table.propTypes = {
    onSort: PropTypes.func,
    sortBy: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};

export default Table;
