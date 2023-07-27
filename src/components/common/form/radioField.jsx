import React from "react";
import PropTypes from "prop-types";

function RadioField({ options, name, onChange, value, label }) {
    const handleChange = ({ target }) => {
        // Debug
        console.log("TextField target ===", target);
        console.log(
            "target.name =",
            target.name,
            "target.value =",
            target.value
        );
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div>
                {options &&
                    options.map((option) => {
                        return (
                            <div
                                key={option.name + "_" + option.value}
                                className="form-check form-check-inline"
                            >
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={name}
                                    id={option.name + "_" + option.value}
                                    checked={option.value === value}
                                    value={option.value}
                                    onChange={handleChange}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={option.name + "_" + option.value}
                                >
                                    {option.name}
                                </label>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

RadioField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
};

export default RadioField;
