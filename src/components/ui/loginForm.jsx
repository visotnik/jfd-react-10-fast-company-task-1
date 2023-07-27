import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";

const LoginForm = () => {
    // отсеживание состояния каждого поля фотмы (сколько полей в форме,
    // столько и объектов. Поле объекта = name поля
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    // универсальный метод при onChange любого поля
    // target.name совпадает и именованием поля в объекте data
    // const handleChange = ({ target }) => {
    //     console.log("event", target.name);
    //     setData((prevState) => ({
    //         ...prevState,
    //         [target.name]: target.value
    //     }));
    // };
    // новая версия универсального метода
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // схема для валидации через библиотеку yup
    const validateSchema = yup.object().shape({
        password: yup
            .string()
            .required("Password обязателен для заполнения")
            .matches(/(?=.*[A-Z])/, "Password должен содержать большую букву")
            .matches(/(?=.*[0-9])/, "Password должен содержать цифру")
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Password должен содержать хотя бы один спецсимвол"
            )
            .matches(
                /(?=.{8,})/,
                "Password должен содержать минимум 8 символов"
            ),
        email: yup
            .string()
            .required("Email обязателен для заполнения")
            .email("Email is not valide")
    });

    // схема для валидации через свой файл validator.js
    const validatorConfig = {
        email: {
            isRequired: {
                message: "Email обязателен для заполнения"
            },
            isEmail: {
                message: "Email is not valide."
            }
        },
        password: {
            isRequired: {
                message: "Password обязателен для заполнения"
            },
            isCapitalSymbol: {
                message: "Password должен содержать большую букву"
            },
            isContainDigit: {
                message: "Password должен содержать цифру"
            },
            isMinCharacters: {
                message: "Password должен содержать минимум 8 символов",
                value: 8
            }
        }
    };

    // валидация формы: в момент изменения состояния data
    // вызываем метод validate()
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        // 1.
        // простой метод валидации
        // const errors = {};
        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === "") {
        //         errors[fieldName] = `${fieldName} обязательно для заполнения`;
        //     }
        // }
        // 2.
        // вызываем файл validator() из validator.js и
        // получаем в объект errors ошибку
        // const errors = validator(data, validatorConfig);
        // setErrors(errors);
        // 3.
        // валидация через yup
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        return Object.keys(errors).length === 0;
    };

    const isValidate = Object.keys(errors).length === 0;

    // метод отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        console.log("Submit form", data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label={"Email"}
                name={"email"}
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label={"Password"}
                type={"password"}
                name={"password"}
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            <button
                className="btn btn-primary w-100 mx-auto"
                type={"submit"}
                disabled={!isValidate}
            >
                Submit
            </button>
        </form>
    );
};

export default LoginForm;
