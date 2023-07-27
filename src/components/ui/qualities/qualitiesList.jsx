import React from "react";
import Quality from "./quality";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((item) => (
                <span key={item._id}>
                    <Quality
                        _id={item._id}
                        name={item.name}
                        color={item.color}
                    />
                </span>
            ))}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
