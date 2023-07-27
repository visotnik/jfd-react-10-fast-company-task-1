import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPasswors, setshowPasswors] = useState(false);
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    const toggleShowPassword = () => {
        setshowPasswors((prevState) => !prevState);
    };

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
            <label htmlFor={name}>{label}</label>
            <div className="input-group has-validation">
                <input
                    type={showPasswors ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                />
                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPasswors ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default TextField;
