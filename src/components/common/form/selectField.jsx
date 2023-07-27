import React from "react";
import PropTypes from "prop-types";

function SelectField({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error
}) {
    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    // Array.isArray() возвращает true, если объект является массивом
    // и false, если он массивом не является
    // Object.keys(obj) – возвращает массив ключей объекта

    let optionsArray = [];

    // optionsArray =
    //     !Array.isArray(options) && typeof options === "object"
    //         ? Object.keys(options).map((optionName) => ({
    //               name: optionName,
    //               value: option[optionName].value
    //           }))
    //         : options;

    if (!Array.isArray(options) && typeof options === "object") {
        console.log("======================");
        console.log("SelectField OPTIONS = ", options);
        optionsArray = Object.keys(options).map((optionName) => ({
            name: options[optionName].name,
            value: options[optionName]._id
        }));
        console.log("SelectField optionsArray = ", optionsArray);
    } else {
        optionsArray = options;
    }

    const handleChange = ({ target }) => {
        // Debug
        console.log("SelectField target ===", target);
        console.log(
            "target.name =",
            target.name,
            "target.value =",
            target.value
        );
        onChange({ name: target.name, value: target.value });
    };

    return (
        <>
            {/* {options &&
                Object.keys(options).map((option) => {
                    return (
                        <p key={options[option]._id}>{options[option].name}</p>
                    );
                })} */}
            {/* <p>test component</p>
            {options &&
                options.map((option) => {
                    return (
                        <>
                            <p>опция:</p>
                            <p key={option.value}>{option.name}</p>
                        </>
                    );
                })} */}
            <div className="mb-4">
                <label htmlFor="validationCustom04" className="form-label">
                    {label}
                </label>
                <select
                    className={getInputClasses()}
                    id="validationCustom04"
                    name="profession"
                    value={value}
                    onChange={handleChange}
                >
                    <option disabled value="">
                        {defaultOption}
                    </option>
                    {optionsArray &&
                        optionsArray.map((option) => {
                            return (
                                <option key={option.value} value={option.value}>
                                    {option.name}
                                </option>
                            );
                        })}
                </select>
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </>
    );
}
SelectField.propTypes = {
    defaultOption: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default SelectField;
