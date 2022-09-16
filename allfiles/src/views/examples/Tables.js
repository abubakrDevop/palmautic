import cls from '../../assets/scss/react/_customTables.module.scss'
import {IoIosSearch} from 'react-icons/io'
import {useForm} from "react-hook-form";
import {NavLink} from "react-router-dom"
import {Form} from "../../helpers/form"
import React, {useEffect} from "react";
import {ContactEditor} from "./ContactEditor.js"
// import { postContact, searchGet } from '../../helpers/form/restApi'

const Tables = () => {
    const [data, setData] = React.useState([])
    const [active, setActive] = React.useState(false)
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [link, setLink] = React.useState('')
    const [company, setCompany] = React.useState('')
    const [idNum, setId] = React.useState(null)
    const [selected, setSelected] = React.useState({})
    const [json, setJson] = React.useState()

    const handleActive = () => {
        setActive(prev => !prev)
    }

    const {
        formState,
        reset,
        register,
        handleSubmit
    } = useForm()

    let id = 0

    const onSubmit = (data) => {
        id++

        fetch('http://45.156.119.155:3002/contacts/createOrUpdate', {
            method: 'POST',
            headers: {
                'caller-version-code': '1',
                'sessionToken': 'user-1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                phone: data.number,
                email: data.email,
                name: data.name,
                linkedin: data.linkedin,
                company: data.company
            })
        })
            .then(res => {
                if (res.statusText === 'OK') {
                    window.location.reload()
                }
            })
            .then(change => {
            })

        fetch('http://45.156.119.155:3002/contacts/createOrUpdate', {
            method: 'POST',
            headers: {
                'caller-version-code': '1',
                'sessionToken': 'user-1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: idNum !== null ? idNum : id,
                phone: data.number,
                email: data.email,
                name: data.name,
                linkedin: data.linkedin,
                company: data.company
            })
        })
            .then(res => {
                if (res.statusText === 'OK') {
                    window.location.reload()
                }
            })
            .then(change => {
            })
    }

    console.log(data)

    useEffect(() => {
        fetch('http://45.156.119.155:3002/contacts/search', {
            method: 'POST',
            headers: {
                'caller-version-code': '1',
                'sessionToken': 'user-1',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
            .then(response => response.json())
            .then(json => {
                setData(json.result)
                setJson(json.result)
            })
            .then(seatch => {
            })
    }, [id])

    const handleChange = e => {
        let value = e.target.value.toLowerCase()
        const newData = data.filter(({name}) => {
            return name.toLowerCase().includes(value)
        })
        setData(newData)
        value === '' ? setData(json) : console.log()
    }

    const handleClean = () => {
        setId(null)
        reset()
    }

    const icoStyle = {
        width: '30px',
        marginRight: '5px',
    };

    return (
        <>
            <div className={`container-fluid`}>
                <div className={`mt-5 row`}>
                    <h1>Контакты</h1>
                </div>
                <div className={`mt-5 row`}>
                    <div className={`mb-5 mb-xl-0 col-xl-8`}>
                        <div className={`shadow card`}>
                            <div className="border-0 card-header">
                                <div className="align-items-center row">
                                    <div className="col">
                                        <div className="mb-0">
                                            <div className={cls.searchBox}>
                                                <input type="search"
                                                       className="form-control-rounded form-control-prepended"
                                                    // className={cls.search}
                                                       placeholder="Поиск..."
                                                       onChange={handleChange}
                                                />
                                                <IoIosSearch className={cls.icon}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col text-right"><a href="#pablo" className="btn btn-primary">Загрузить
                                        {/*<input type="file" className={cls.file}/>*/}
                                    </a>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="align-items-center table-flush table">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">Имя</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Телефон</th>
                                        <th scope="col">Компания</th>
                                        <th scope="col">
                                            {/*<img style={icoStyle}*/}
                                            {/*     alt="linkedin"*/}
                                            {/*     src={require("../../assets/img/icons/linkedin-logo.png")}*/}
                                            {/*/>*/}
                                            LinkedIn
                                        </th>
                                        <th scope="col">Последовательность</th>
                                        <th scope="col">Активный</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {data.map(item => (
                                        <tr data-id={item.id} onClick={() => {
                                            setSelected(item)
                                        }}>
                                            <td><input type="checkbox" className={cls.checkbox} onClick={handleActive}/>
                                            </td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.company}</td>
                                            <td>{item.linkedin}</td>
                                            <td>Основная</td>
                                            <td></td>
                                            }
                                        </tr>
                                    ))}
                                    {/*<div to={'setActive'}*/}
                                    {/*     key={item.id}*/}
                                    {/*     data-id={item.id}*/}
                                    {/*     className={`${cls.contact} ${idNum !== null && cls.active}`}*/}
                                    {/*     onClick={() => {*/}
                                    {/*         setId(item.id)*/}
                                    {/*         setName(item.name)*/}
                                    {/*         setEmail(item.email)*/}
                                    {/*         setPhone(item.phone)*/}
                                    {/*         setLink(item.linkedin)*/}
                                    {/*         setCompany(item.company)*/}
                                    {/*     }}*/}
                                    {/*>*/}
                                    {/*    <input type="checkbox" className={cls.checkbox} onClick={handleActive}/>*/}
                                    {/*    <p className={cls.contactInfo}> {item.name} </p>*/}
                                    {/*    <p className={cls.contactInfo}> {item.email} </p>*/}
                                    {/*    <p className={cls.contactInfo}> {item.phone} </p>*/}
                                    {/*    <p className={cls.contactInfo}> {item.company} </p>*/}
                                    {/*    <p className={cls.contactInfo}> {item.linkedin} </p>*/}
                                    {/*    <p className={cls.contactInfo}> {} </p>*/}
                                    {/*    <p className={cls.contactInfo}> {} </p>*/}
                                    {/*</div>*/}
                                    {/*))*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className={`mb-5 mb-xl-0 col-xl-4`}>
                        <ContactEditor contact={selected}/>

                        {/*<div className={cls.addInputsHead}>*/}
                        {/*    <form onSubmit={handleSubmit(onSubmit)} className={`${cls.addInputs} ${cls.div}`}>*/}
                        {/*        <h1 className={cls.headTitle}>{idNum === null ? 'Добавить контакт' : 'Изменить контакт'}</h1>*/}
                        {/*        <span className={cls.title}>{idNum === null ? null : name}</span>*/}

                        {/*        {*/}
                        {/*            formState.errors.name &&*/}
                        {/*            <span className={cls.errors}> {formState.errors.name.message} </span>*/}
                        {/*        }*/}

                        {/*        <input*/}
                        {/*            className={cls.input}*/}
                        {/*            type="text"*/}
                        {/*            placeholder="Введите имя..."*/}
                        {/*            defaultValue={idNum === null ? '' : name}*/}
                        {/*            {...register('name', Form.Options.allInputs)}*/}
                        {/*        />*/}

                        {/*        {*/}
                        {/*            formState.errors.email &&*/}
                        {/*            <span className={cls.errors}> {formState.errors.email.message} </span>*/}
                        {/*        }*/}

                        {/*        <input*/}
                        {/*            className={cls.input}*/}
                        {/*            type="email"*/}
                        {/*            placeholder="Введите email..."*/}
                        {/*            defaultValue={idNum === null ? '' : email}*/}
                        {/*            {...register('email', Form.Options.email)}*/}
                        {/*        />*/}

                        {/*        {*/}
                        {/*            formState.errors.number &&*/}
                        {/*            <span className={cls.errors}> {formState.errors.number.message} </span>*/}
                        {/*        }*/}

                        {/*        <input*/}
                        {/*            className={cls.input}*/}
                        {/*            type="text"*/}
                        {/*            placeholder="Номер телефона..."*/}
                        {/*            defaultValue={idNum === null ? '' : phone}*/}
                        {/*            {...register('number', Form.Options.allInputs)}*/}
                        {/*        />*/}

                        {/*        {*/}
                        {/*            formState.errors.linkedin &&*/}
                        {/*            <span className={cls.errors}> {formState.errors.linkedin.message} </span>*/}
                        {/*        }*/}

                        {/*        <input*/}
                        {/*            className={cls.input}*/}
                        {/*            type="text"*/}
                        {/*            placeholder="Название linkedin..."*/}
                        {/*            defaultValue={idNum === null ? '' : link}*/}
                        {/*            {...register('linkedin', Form.Options.allInputs)}*/}
                        {/*        />*/}

                        {/*        {*/}
                        {/*            formState.errors.company &&*/}
                        {/*            <span className={cls.errors}> {formState.errors.company.message} </span>*/}
                        {/*        }*/}

                        {/*        <input*/}
                        {/*            className={cls.input}*/}
                        {/*            type="text"*/}
                        {/*            placeholder="Название вашей компании..."*/}
                        {/*            defaultValue={idNum === null ? '' : company}*/}
                        {/*            {...register('company', Form.Options.allInputs)}*/}
                        {/*        />*/}

                        {/*        <button className={cls.button}*/}
                        {/*                type="submit">{idNum === null ? 'Добавить' : 'Сохранить'}</button>*/}
                        {/*        <span onClick={handleClean}*/}
                        {/*              className={cls.button_clean}>{idNum === null ? 'Очистить' : 'Отменить изменение'}</span>*/}
                        {/*    </form>*/}
                        {/*</div>*/}
                    </div>
                    {/*<header className={cls.header}>*/}
                    {/*    <h1 className={cls.headTitle}>Контакты</h1>*/}
                    {/*    <main className={cls.main}>*/}
                    {/*        <div className={`${cls.contacts} ${cls.div}`}>*/}
                    {/*            <section className={cls.section}>*/}
                    {/*                <label className={cls.label}>*/}
                    {/*                    Загрузить*/}
                    {/*                    <input type="file" className={cls.file}/>*/}
                    {/*                </label>*/}
                    {/*                <div className={cls.searchBox}>*/}

                    {/*                    <input*/}
                    {/*                        type="search"*/}
                    {/*                        className={cls.search}*/}
                    {/*                        placeholder="Поиск..."*/}
                    {/*                        onChange={handleChange}*/}
                    {/*                    />*/}
                    {/*                    <IoIosSearch className={cls.icon}/>*/}
                    {/*                </div>*/}
                    {/*            </section>*/}
                    {/*            <section className={cls.headTitles}>*/}
                    {/*                <p className={cls.headTitles_text}>Имя</p>*/}
                    {/*                <p className={cls.headTitles_text}>Email</p>*/}
                    {/*                <p className={cls.headTitles_text}>Номер</p>*/}
                    {/*                <p className={cls.headTitles_text}>Компания</p>*/}
                    {/*                <p className={cls.headTitles_text}>Linkedin</p>*/}
                    {/*                <p className={cls.headTitles_text}>Последовательность</p>*/}
                    {/*                <p className={cls.headTitles_text}>Активный</p>*/}
                    {/*            </section>*/}
                    {/*            <section className={cls.contactInner}>*/}
                    {/*                {*/}

                    {/*                    data.map(item => (*/}
                    {/*                        <div to={'setActive'}*/}
                    {/*                             key={item.id}*/}
                    {/*                             data-id={item.id}*/}
                    {/*                             className={`${cls.contact} ${idNum !== null && cls.active}`}*/}
                    {/*                             onClick={() => {*/}
                    {/*                                 setId(item.id)*/}
                    {/*                                 setName(item.name)*/}
                    {/*                                 setEmail(item.email)*/}
                    {/*                                 setPhone(item.phone)*/}
                    {/*                                 setLink(item.linkedin)*/}
                    {/*                                 setCompany(item.company)*/}
                    {/*                             }}*/}
                    {/*                        >*/}
                    {/*                            <input type="checkbox" className={cls.checkbox} onClick={handleActive}/>*/}
                    {/*                            <p className={cls.contactInfo}> {item.name} </p>*/}
                    {/*                            <p className={cls.contactInfo}> {item.email} </p>*/}
                    {/*                            <p className={cls.contactInfo}> {item.phone} </p>*/}
                    {/*                            <p className={cls.contactInfo}> {item.company} </p>*/}
                    {/*                            <p className={cls.contactInfo}> {item.linkedin} </p>*/}
                    {/*                            <p className={cls.contactInfo}> {} </p>*/}
                    {/*                            <p className={cls.contactInfo}> {} </p>*/}
                    {/*                        </div>*/}
                    {/*                    ))*/}

                    {/*                }*/}
                    {/*            </section>*/}
                    {/*        </div>*/}
                    {/*        <div className={cls.addInputsHead}>*/}
                    {/*            <form onSubmit={handleSubmit(onSubmit)} className={`${cls.addInputs} ${cls.div}`}>*/}
                    {/*                <h1 className={cls.headTitle}>{idNum === null ? 'Добавить контакт' : 'Изменить контакт'}</h1>*/}
                    {/*                <span className={cls.title}>{idNum === null ? null : name}</span>*/}

                    {/*                {*/}
                    {/*                    formState.errors.name &&*/}
                    {/*                    <span className={cls.errors}> {formState.errors.name.message} </span>*/}
                    {/*                }*/}

                    {/*                <input*/}
                    {/*                    className={cls.input}*/}
                    {/*                    type="text"*/}
                    {/*                    placeholder="Введите имя..."*/}
                    {/*                    defaultValue={idNum === null ? '' : name}*/}
                    {/*                    {...register('name', Form.Options.allInputs)}*/}
                    {/*                />*/}

                    {/*                {*/}
                    {/*                    formState.errors.email &&*/}
                    {/*                    <span className={cls.errors}> {formState.errors.email.message} </span>*/}
                    {/*                }*/}

                    {/*                <input*/}
                    {/*                    className={cls.input}*/}
                    {/*                    type="email"*/}
                    {/*                    placeholder="Введите email..."*/}
                    {/*                    defaultValue={idNum === null ? '' : email}*/}
                    {/*                    {...register('email', Form.Options.email)}*/}
                    {/*                />*/}

                    {/*                {*/}
                    {/*                    formState.errors.number &&*/}
                    {/*                    <span className={cls.errors}> {formState.errors.number.message} </span>*/}
                    {/*                }*/}

                    {/*                <input*/}
                    {/*                    className={cls.input}*/}
                    {/*                    type="text"*/}
                    {/*                    placeholder="Номер телефона..."*/}
                    {/*                    defaultValue={idNum === null ? '' : phone}*/}
                    {/*                    {...register('number', Form.Options.allInputs)}*/}
                    {/*                />*/}

                    {/*                {*/}
                    {/*                    formState.errors.linkedin &&*/}
                    {/*                    <span className={cls.errors}> {formState.errors.linkedin.message} </span>*/}
                    {/*                }*/}

                    {/*                <input*/}
                    {/*                    className={cls.input}*/}
                    {/*                    type="text"*/}
                    {/*                    placeholder="Название linkedin..."*/}
                    {/*                    defaultValue={idNum === null ? '' : link}*/}
                    {/*                    {...register('linkedin', Form.Options.allInputs)}*/}
                    {/*                />*/}

                    {/*                {*/}
                    {/*                    formState.errors.company &&*/}
                    {/*                    <span className={cls.errors}> {formState.errors.company.message} </span>*/}
                    {/*                }*/}

                    {/*                <input*/}
                    {/*                    className={cls.input}*/}
                    {/*                    type="text"*/}
                    {/*                    placeholder="Название вашей компании..."*/}
                    {/*                    defaultValue={idNum === null ? '' : company}*/}
                    {/*                    {...register('company', Form.Options.allInputs)}*/}
                    {/*                />*/}

                    {/*                <button className={cls.button}*/}
                    {/*                        type="submit">{idNum === null ? 'Добавить' : 'Сохранить'}</button>*/}
                    {/*                <span onClick={handleClean}*/}
                    {/*                      className={cls.button_clean}>{idNum === null ? 'Очистить' : 'Отменить изменение'}</span>*/}
                    {/*            </form>*/}
                    {/*        </div>*/}
                    {/*    </main>*/}
                    {/*</header>*/}
                </div>
            </div>
        </>
    );
};

export default Tables;
