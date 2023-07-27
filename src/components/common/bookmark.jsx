import React from "react";
import PropTypes from "prop-types";

const BookMark = (props) => {
    // const BookMark = ({status, ...rest}) => {

    const { status, id, onToggleBookmark } = props;
    // определяем вид кнопки в зависимости от status
    // status определяется в классе APP функцией handleToggleBookmark

    /*   const button =
    status === true ? (
      <i className="bi bi-heart-fill"></i>
    ) : (
      <i className="bi bi-bookmark"></i>
    ); */

    // !status - возвращает любое ложное значение
    // Ложные значения — это false, 0, », null, undefined и NaN
    const button = !status ? (
        <i className="bi bi-bookmark"></i>
    ) : (
        <i className="bi bi-heart-fill"></i>
    );

    return (
        <button
            className="btn bg-warning"
            type="button"
            onClick={() => onToggleBookmark(id)}
        >
            {button}
        </button>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onToggleBookmark: PropTypes.func.isRequired
};

export default BookMark;
