import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import API from "../../../api";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";

function EditUserPage() {
    // получаем id user из параметров url
    const params = useParams();
    const userId = params.userId;
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: []
    });

    // данные professions { doctor: { _id: "", name: "" }, ..., ...}
    const [professions, setProfessions] = useState();
    // данные qualities { strange: { _id:"", name: "", color: ""}, ..., ...}
    const [qualities, setQualities] = useState({});
    const [errors, setErrors] = useState({});

    const getProfessionById = (id) => {
        // вариант 1
        const prof = Object.keys(professions).find((key) => {
            return professions[key]._id === id;
        });
        console.log("professions.prof =", professions[prof]);
        return professions[prof];
        // вариант 2
        // for (const prof in professions) {
        //     const profData = professions[prof];
        //     if (profData._id === id) {
        //         console.log("professions.prof 1 =", profData);
        //         return profData;
        //     }
        // }
    };

    // data.qualities []
    // 0: {label: 'Странный', value: '67rdca3eeb7f6fgeed471100'}
    // 1: {label: 'Неуверенный', value: '67rdca3eeb7f6fgeed471103'}
    // qualities {}
    // name: {_id: '67rdca3eeb7f6fgeed471100', name: 'Странный', color: 's
    // name: {_id: '67rdca3eeb7f6fgeed471103', name: 'Неуверенный', color:

    const getQualities = (qual) => {
        const qualsForUpdate = qual.map((item) => {
            const quals = Object.keys(qualities).find(
                (itemQual) => qualities[itemQual]._id === item.value
            );
            return qualities[quals];
        });
        return qualsForUpdate;
    };

    // метод отправки формы
    function handleSubmit(e) {
        e.preventDefault();
        const isValidate = validate();
        if (!isValidate) return;
        const { profession, qualities } = data;
        console.log("NEW DATA data.profession", getProfessionById(profession));
        console.log("NEW DATA data.qualities", getQualities(qualities));
        API.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`));
    }

    // на вход: data = [qualities.uncertain, qualities.strange]
    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };

    useEffect(() => {
        setIsLoading(true);
        API.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        );
        API.professions.fetchAll().then((data) => setProfessions(data));
        API.qualities.fetchAll().then((data) => setQualities(data));
    }, []);
    useEffect(() => {
        if (data._id) setIsLoading(false);
    }, [data]);

    const validatorConfog = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    useEffect(() => validate(), [data]);
    // новая версия универсального метода
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Edit User</h3>
                    {/* !isLoading && Object.keys(professions).length > 0 */}
                    {!isLoading && (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label={"Имя"}
                                name={"name"}
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label={"Email"}
                                name={"email"}
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
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
                                label="Выберите ваши качества"
                                options={qualities}
                                onChange={handleChange}
                                name="qualities"
                                defaultValue={data.qualities}
                            />
                            <button
                                className="btn btn-primary w-100 mx-auto"
                                type={"submit"}
                                disabled={!isValid}
                            >
                                Submit
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default EditUserPage;
