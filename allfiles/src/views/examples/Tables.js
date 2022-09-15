import Header from "components/Headers/Header.js";
import cls from '../../assets/scss/react/_customTables.module.scss'
import { IoIosSearch } from 'react-icons/io'
import { useForm } from "react-hook-form";
import { Form } from "../../helpers/form"
import React, { useEffect } from "react";
// import { postContact, searchGet } from '../../helpers/form/restApi'

const Tables = () => {
  const [data, setData] = React.useState([
    {
      id: 1,
      accountId: 1001,
      name: 'Viola Price',
      phone: "(815) 823-6532",
      email: "tobu@oheaseki.gf",
      company: "Baker Hughes Incorporated",
      linkedin: "hecgi"
    },
    {
      id: 2,
      accountId: 1001,
      name: 'Viola Price',
      phone: "(815) 823-6532",
      email: "tobu@oheaseki.gf",
      company: "Baker Hughes Incorporated",
      linkedin: "hecgi"
    },
  ])
  const [active, setActive] = React.useState(false)
  const [idNum, setId] = React.useState(null)

  const handleActive = () => {
    setActive(prev => !prev)
  }

  const {
    formState,
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
    .then(change => {})
    
    fetch('http://45.156.119.155:3002/contacts/createOrUpdate', {
      method: 'POST',
      headers: {
        'caller-version-code': '1',
        'sessionToken': 'user-1',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: idNum,
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
    .then(change => {})
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
      body: JSON.stringify({

      })
      })
    .then(response => response.json())
    .then(json => {
      setData(json.result)
    })
    .then(seatch => {
    })
  }, [id])

  const handleChange = e => {
    let value = e.target.value.toLowerCase()
    const newData = data.filter( ({ name }) => {
      return name.toLowerCase().includes(value)
    })
    setData(newData)
    value === '' ? window.location.reload() : setData(newData)
  }

  return (
    <>
      <Header />
      <header className={cls.header}>
        <h1 className={cls.headTitle}>Контакты</h1>
        <main className={cls.main}>
          <div className={`${cls.contacts} ${cls.div}`}>
            <section className={cls.section}>
              <label className={cls.label}> 
                Загрузить
                <input type="file" className={cls.file} />
              </label>
              <div className={cls.searchBox}>

                <input 
                  type="search" 
                  className={cls.search} 
                  placeholder="Поиск..." 
                  onChange={handleChange}
                />
                <IoIosSearch className={cls.icon} />
              </div>
            </section>
            <section className={cls.headTitles}>
              <p className={cls.headTitles_text}>Имя</p>
              <p className={cls.headTitles_text}>Email</p>
              <p className={cls.headTitles_text}>Номер</p>
              <p className={cls.headTitles_text}>Компания</p>
              <p className={cls.headTitles_text}>Linkedin</p>
              <p className={cls.headTitles_text}>Последовательность</p>
              <p className={cls.headTitles_text}>Активный</p>
            </section>
            <section className={cls.contactInner}>
              {
                
                  data.map(item => (
                    <div 
                      key={item.id} 
                      data-id={item.id}
                      className={`${cls.contact} ${active && cls.active}`}
                      onClick={() => setId(item.id)}
                    >
                      <input type="checkbox" className={cls.checkbox} onClick={handleActive} />
                      <p className={cls.contactInfo}> { item.name } </p>
                      <p className={cls.contactInfo}> { item.email } </p>
                      <p className={cls.contactInfo}> { item.phone } </p>
                      <p className={cls.contactInfo}> { item.company } </p>
                      <p className={cls.contactInfo}> { item.linkedin } </p>
                      <p className={cls.contactInfo}> { } </p>
                      <p className={cls.contactInfo}> { } </p>
                    </div>
                  ))
                
              }
            </section>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={`${cls.addInputs} ${cls.div}`}>
            <h1 className={cls.headTitle}>{idNum === null ? 'Добавить контакт' : 'Изменить контакт' }</h1>

            {
              formState.errors.name && <span className={cls.errors}> {formState.errors.name.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Введите имя..." 
              {...register('name', Form.Options.allInputs)}
            />

            {
              formState.errors.email && <span className={cls.errors}> {formState.errors.email.message} </span>
            }

            <input 
              className={cls.input} 
              type="email" 
              placeholder="Введите email..." 
              {...register('email', Form.Options.email)}
            />

            {
              formState.errors.number && <span className={cls.errors}> {formState.errors.number.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Номер телефона..." 
              {...register('number', Form.Options.allInputs)}
            />

            {
              formState.errors.linkedin && <span className={cls.errors}> {formState.errors.linkedin.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Название linkedin..." 
              {...register('linkedin', Form.Options.allInputs)}
            />

            {
              formState.errors.company && <span className={cls.errors}> {formState.errors.company.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Название вашей компании..." 
              {...register('company', Form.Options.allInputs)}
            />

            <button className={cls.button} type="submit">Добавить</button>
          </form>
        </main>
      </header>
    </>
  );
}; 

export default Tables;
