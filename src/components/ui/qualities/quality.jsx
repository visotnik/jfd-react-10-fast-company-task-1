import React from "react";
import PropTypes from "prop-types";

const Quality = (props) => {
    const { color, name, _id } = props;
    const classItem = `badge m-1 bg-${color}`;
    return (
        // если поставить key только здесь, то возникает ошибка
        // нужно использовать key только рядом с функций итерации списка
        // в данном случае в User
        <span key={_id} className={classItem}>
            {name}
        </span>
    );
};

Quality.propTypes = {
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
};

export default Quality;
