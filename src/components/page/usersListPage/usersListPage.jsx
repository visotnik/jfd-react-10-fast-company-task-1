import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import API from "../../../api";

import { paginate } from "../../../utils/paginate";
import { isEqualObject } from "../../../utils/isequalobject";

import SearchUsers from "../../ui/searchUsers";
import SearchStatus from "../../ui/searchstatus";
import Pagination from "../../common/pagination";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import _ from "lodash";

// что такое useEffect
// React Hooks — useEffect (классовый подход и функциональный)
// https://www.youtube.com/watch?v=slaaDOt0ZvM

const UsersListPage = () => {
    // currentPage is a pagination number - for dafault = 1
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setsortBy] = useState({ iter: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 8;

    // === начало. Перенос кода из App.js
    const [users, setUsers] = useState();
    useEffect(() => {
        API.users.fetchAll().then((data) => {
            setUsers(data);
        });
    }, []);

    // debug
    console.log("users===", users);

    const handleDelete = (userId) => {
        setUsers(
            users.filter((user) => {
                return user._id !== userId;
            })
        );
        console.log(users.length);
    };

    const handleToggleBookmark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    // !user.bookmark - возвращает любое ложное значение
                    // Ложные значения — это false, 0, », null, undefined и NaN
                    // т.е. будет проверка и на false и на undefined
                    console.log("App Component status =", !user.bookmark);
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };
    // === конец.

    // useEffect вызываем в момент componentDidMount
    useEffect(() => {
        console.log("send request");
        API.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
    }, []);

    // useEffect вызываем в момент componentDidUpdate наблюдаем за professions
    // код только для депонстрации работы useEffect
    useEffect(() => {
        console.log("resive data", professions);
    }, [professions]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    //

    if (users) {
        // SearchQueryInputChange
        const handleSearchQuery = ({ target }) => {
            setSelectedProf(undefined);
            setSearchQuery(target.value);
        };
        // ======= ФИЛЬТРАЦИЯ по ПОИСКУ или по ПРОФЕССИИ
        let filteredUsers;
        if (searchQuery) {
            filteredUsers = users.filter((user) => {
                return user.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            });
            // ======= ФИЛЬТРАЦИЯ по ПРОФЕССИИ
            // отфильтровываем users по professions
        } else if (selectedProf) {
            filteredUsers = users.filter((user) => {
                // user.profession и selectedProf 2 разные объекта, поэтому нужно
                // сравнивать объект по их ключам и значениям
                // 1-й способ JSON.stringify(obj)
                // 2-й способ метод _.isEqual(obj1, obj2) библиотеки lodash
                // 3-й способ своя функция, переводить каждый объект в массив и сравнивать массивы
                console.log(
                    "===",
                    JSON.stringify(user.profession) ===
                        JSON.stringify(selectedProf)
                );
                return isEqualObject(user.profession, selectedProf);
            });
        } else {
            filteredUsers = users;
        }
        // const filteredUsers = selectedProf
        //     ? users.filter((user) => {
        //           return user.profession === selectedProf;
        //       })
        //     : users;

        const usersLength = filteredUsers.length;

        // СОРТИРОВКА
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.iter],
            [sortBy.order]
        );

        // ======= ПАГИНАЦИЯ
        // создаем обрезанный массив для вывода на страницу пейдженации
        // из массива отсортерованных users - sortedUsers
        const usersCrop = paginate(sortedUsers, currentPage, itemsPerPage);

        const handlePageChange = (page) => {
            setCurrentPage(page);
        };

        const handleProfessionSelect = (item) => {
            if (searchQuery !== "") setSearchQuery("");
            setSelectedProf(item);
        };

        const clearSelect = () => {
            setSelectedProf(undefined);
        };
        const handleSort = (item) => {
            setsortBy(item);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                            selectedItem={selectedProf}
                            // для работы с универсальным объектом
                            // значения valueProperty и contentProperty определены
                            // по default в коппоненте GroupList
                            valueProperty={"_id"}
                            contentProperty={"name"}
                        />
                        {selectedProf && (
                            <button
                                type="button"
                                className="btn btn-secondary mt-2"
                                onClick={clearSelect}
                            >
                                Очистить
                            </button>
                        )}
                    </div>
                )}

                <div className="d-flex flex-column">
                    <SearchStatus length={usersLength} />
                    <SearchUsers
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />
                    {/* выводим таблицу только если users.length > 0 см. как работает && в JS */}
                    {usersLength > 0 && (
                        <UserTable
                            usersCrop={usersCrop}
                            onSort={handleSort}
                            sortBy={sortBy}
                            onDelete={handleDelete}
                            onToggleBookmark={handleToggleBookmark}
                            currentPage={currentPage}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={usersLength}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange}
                            currentPage={currentPage}
                            usersCrop={usersCrop}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "Loading...";
};

UsersListPage.propTypes = {
    users: PropTypes.array,
    onDelete: PropTypes.func,
    onToggleBookmark: PropTypes.func
};

export default UsersListPage;
