import React from "react";
import PropTypes from "prop-types";

function CheckBoxField({ name, value, onChange, children, error }) {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };
    const getInputClasses = () => {
        return "form-check-input" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            {/* <label className="form-label">label</label> */}
            <div>
                <div className="form-check">
                    <input
                        className={getInputClasses()}
                        type="checkbox"
                        value=""
                        id={name}
                        onChange={handleChange}
                        checked={value}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault"
                    >
                        {children}
                    </label>
                    {error && <div className="invalid-feedback">{error}</div>}
                </div>
            </div>
        </div>
    );
}
CheckBoxField.propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    error: PropTypes.string
    // label: PropTypes.string
};

export default CheckBoxField;
