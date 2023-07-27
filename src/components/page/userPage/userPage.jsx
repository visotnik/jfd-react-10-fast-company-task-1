import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Quality from "../../ui/qualities/quality";
import API from "../../../api";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    const handleBack = () => {
        history.push("/users");
        // или функция goBack()
        // history.goBack();
    };

    const handleEdit = () => {
        history.push(`${history.location.pathname}/edit`);
    };

    console.log("user=", user);
    if (user) {
        console.log("user=", user);
        console.log("history", history);
        return (
            <>
                <h1>Имя: {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <div>
                    <h3>Качества:</h3>
                    {user.qualities.map((item) => {
                        return (
                            <span key={item._id}>
                                <Quality
                                    _id={item._id}
                                    name={item.name}
                                    color={item.color}
                                />
                            </span>
                        );
                    })}
                </div>
                <h4>completedMeetings: {user.completedMeetings}</h4>
                <h4>Rate: {user.rate}</h4>
                <button
                    onClick={() => {
                        handleBack();
                    }}
                >
                    Все пользователи
                </button>
                <button
                    onClick={() => {
                        handleEdit();
                    }}
                >
                    Редактировать данные
                </button>
            </>
        );
    } else {
        return (
            <>
                <h1>Loading (UserPage) ...</h1>
            </>
        );
    }
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
