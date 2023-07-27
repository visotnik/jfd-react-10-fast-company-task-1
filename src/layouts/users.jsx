import React from "react";
import { useParams } from "react-router-dom";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import EditUserPage from "../components/page/editUserPage";

const Users = () => {
    // парсинг url
    const params = useParams();
    const userId = params.userId;
    const edit = params.edit;
    console.log("USERS.JSX userId=", params);

    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserPage />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default Users;
