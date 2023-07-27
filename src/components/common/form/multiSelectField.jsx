import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

function MultiSelectField({ options, onChange, name, label, defaultValue }) {
    let optionsArray = [];

    // Array.isArray() возвращает true, если объект является массивом
    // и false, если он массивом не является
    // Object.keys(obj) – возвращает массив ключей объекта
    if (!Array.isArray(options) && typeof options === "object") {
        optionsArray = Object.keys(options).map((optionName) => ({
            label: options[optionName].name,
            value: options[optionName]._id
        }));
    } else {
        optionsArray = options;
    }

    const handleChange = (value) => {
        onChange({ name: name, value: value });
    };

    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <Select
                isMulti
                defaultValue={defaultValue}
                closeMenuOnSelect={false}
                options={optionsArray}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
                name={name}
            />
        </div>
    );
}

MultiSelectField.propTypes = {
    options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onChange: PropTypes.func,
    label: PropTypes.string,
    name: PropTypes.string,
    defaultValue: PropTypes.array
};

export default MultiSelectField;
