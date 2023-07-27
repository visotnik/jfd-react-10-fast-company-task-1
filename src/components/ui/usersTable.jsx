import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

// import BookMark from "./bookmark";
import BookMark from "../common/bookmark";
import Qualities from "./qualities";
import Table, { TableBody, TableHeader } from "../common/table";

const UserTable = ({
    usersCrop,
    onSort,
    sortBy,
    onToggleBookmark,
    onDelete,
    currentPage
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    id={user._id}
                    onToggleBookmark={onToggleBookmark}
                />
            )
        },
        delete: {
            name: "Action",
            component: (user) => (
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    Delete
                </button>
            )
        }
    };
    console.log("UserTable (usersCrop) =", usersCrop);
    console.log("UserTable, (usersCrop.qualities) =", usersCrop.qualities);

    return (
        <Table
            onSort={onSort}
            sortBy={sortBy}
            columns={columns}
            data={usersCrop}
        >
            <TableHeader onSort={onSort} sortBy={sortBy} columns={columns} />
            <TableBody columns={columns} data={usersCrop} />
            {/* можно параметры передавать вот так: {...{ columns, data: usersCrop }} */}
        </Table>
    );
};

UserTable.propTypes = {
    usersCrop: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToggleBookmark: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    onSort: PropTypes.func.isRequired,
    sortBy: PropTypes.object.isRequired
};

export default UserTable;
