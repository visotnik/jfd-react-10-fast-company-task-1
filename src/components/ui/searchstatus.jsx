import React from "react";
import PropsTypes from "prop-types";

const SearchStatus = (props) => {
    const { length } = props;

    const renderPhrase = (number) => {
        if (number % 10 === 0) return "человек тусанет";
        if (number % 10 === 1 && number !== 11) return "человек тусанет";
        if (number < 10 && number % 10 >= 2 && number % 10 <= 4) {
            return "человека тусанут";
        }
        if (number < 10 && number % 10 >= 5) return "человек тусанет";
        if (number > 20 && number % 10 >= 2 && number % 10 <= 4) {
            return "человека тусанут";
        }
        if (number > 20 && number % 10 >= 5) return "человек тусанет";
        if (number > 10 && number < 20) return "человек тусанет";
    };

    let counterClass = "badge bg-";
    counterClass += length === 0 ? "danger" : "primary";

    const negativeText = "Никто сегодня с тобой тусить не будет";
    const positiveText = `${length} ${renderPhrase(length)} с тобой сегодня`;

    const searchStatusText = length === 0 ? negativeText : positiveText;

    return (
        <>
            <h2>
                <span className={counterClass}>{searchStatusText}</span>
            </h2>
        </>
    );
};

SearchStatus.propTypes = {
    length: PropsTypes.number.isRequired
};

export default SearchStatus;
