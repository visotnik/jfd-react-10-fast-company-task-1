import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";

function RegisterForm() {
    // отслеживание состояния каждого поля формы (сколько полей в форме,
    // столько и ключей. ключ объекта data должен быть равен name= поля в форме
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        license: false
    });
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});

    // получаем список профессий
    useEffect(() => {
        API.professions.fetchAll().then((data) => setProfessions(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    // универсальный метод при onChange любого поля
    // target.name совпадает c ключем в объекте data
    // const handleChange = ({ target }) => {
    //     if (target) {
    //         setData((prevState) => ({
    //             ...prevState,
    //             [target.name]: target.value
    //         }));
    //     }
    // };
    // новая версия универсального метода
    // из компонента получаем:target = { name: target.name, value: target.value }
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

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
        },
        profession: {
            isRequired: {
                message: "Обязательно выберите вашу профессию"
            }
        },
        license: {
            isRequired: {
                message:
                    "Вы не можете использовать сервис без подтверждения лицензионного соглашения"
            }
        }
    };

    // валидация формы: в момент изменения состояния data
    // вызываем метод validate()
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        // простой метод валидации
        // const errors = {};
        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === "") {
        //         errors[fieldName] = `${fieldName} обязательно для заполнения`;
        //     }
        // }
        setErrors(errors);
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
            <SelectField
                label="Выберите вашу профессию"
                defaultOption="Choose..."
                options={professions}
                onChange={handleChange}
                value={data.profession}
                error={errors.profession}
            />
            <RadioField
                label="Выберите ваш пол"
                options={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" },
                    { name: "Other", value: "other" }
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
            />
            <MultiSelectField
                defaultValue={data.qualities}
                label="Выберите ваши качества"
                name="qualities"
                options={qualities}
                onChange={handleChange}
            />
            <CheckBoxField
                value={data.license}
                onChange={handleChange}
                name="license"
                error={errors.license}
            >
                Подтвердить <a>лицензионное соглашение</a>
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
}

export default RegisterForm;
