import cls from '../../assets/scss/react/_customTables.module.scss'
import { IoIosSearch } from 'react-icons/io'
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom"
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
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [link, setLink] = React.useState('')
  const [company, setCompany] = React.useState('')
  const [idNum, setId] = React.useState(null)
  const [json, setJson] = React.useState()

  const handleActive = () => {
    setActive(prev => !prev)
  }

  const {
    formState,
    reset,
    register,
    handleSubmit,
    setValue
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
      setJson(json.result)
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
    value === '' ? setData(json) : console.log()
  }

  const handleClean = () => {
    setId(null)
    reset()
  }

  return (
    <>
      <header className={cls.header}>
        <h1 className={cls.headTitle}>Контакты</h1>
        <main className={cls.main}>
          <div className={`${cls.contacts} ${cls.div}`}>
            <section className={cls.section}>
              <div className={cls.searchBox}>
                <input 
                  type="search" 
                  className={cls.search} 
                  placeholder="Поиск..." 
                  onChange={handleChange}
                />
                <IoIosSearch className={cls.icon} />
              </div>
              <label className={cls.label}> 
                Загрузить
                <input type="file" className={cls.file} />
              </label>
            </section>
            <section className={cls.headTitles}>
              <p className={cls.headTitles_text}>Имя</p>
              <p className={cls.headTitles_text}>Email</p>
              <p className={cls.headTitles_text}>Номер</p>
              <p className={cls.headTitles_text}>Компания</p>
              <p className={cls.headTitles_text}>Linkedin</p>
              <p className={cls.headTitles_text}>Последовательность</p>
            </section>
            <section className={cls.contactInner}>
              {
                
                  data.map(item => (
                    <div to={'setActive'}
                      key={item.id} 
                      data-id={item.id}
                      className={`${cls.contact} ${idNum !== null && cls.active}`}
                      onClick={() => {
                        setId(item.id)
                        setName(item.name)
                        setEmail(item.email)
                        setPhone(item.phone)
                        setLink(item.linkedin)
                        setCompany(item.company)
                      }}
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
          <div className={`${cls.addInputsHead} ${cls.div}`}>
          <form onSubmit={handleSubmit(onSubmit)} className={`${cls.addInputs}`}>
            <h1 className={cls.headTitle}>{idNum === null ? `Добавить контакт` : `Изменить контакт "${name}"`}</h1>

            {
              formState.errors.name && <span className={cls.errors}> {formState.errors.name.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Введите имя..." 
              {...setValue("name", idNum === null ? '' : name)}
              {...register('name', Form.Options.allInputs)}
            />

            {
              formState.errors.email && <span className={cls.errors}> {formState.errors.email.message} </span>
            }

            <input 
              className={cls.input} 
              type="email" 
              placeholder="Введите email..." 
              {...setValue("email", idNum === null ? '' : email)}
              {...register('email', Form.Options.email)}
            />

            {
              formState.errors.number && <span className={cls.errors}> {formState.errors.number.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Номер телефона..." 
              {...setValue("number", idNum === null ? '' : phone)}
              {...register('number', Form.Options.allInputs)}
            />

            {
              formState.errors.linkedin && <span className={cls.errors}> {formState.errors.linkedin.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Название linkedin..." 
              {...setValue("linkedin", idNum === null ? '' : link)}
              {...register('linkedin', Form.Options.allInputs)}
            />

            {
              formState.errors.company && <span className={cls.errors}> {formState.errors.company.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Название вашей компании..." 
              {...setValue("company", idNum === null ? '' : company)}
              {...register('company', Form.Options.allInputs)}
            />

            <button className={cls.button} type="submit">{idNum === null ? 'Добавить' : 'Сохранить'}</button>
            <div className={cls.buttons}>
              {idNum !== null ? <span onClick={handleClean} className={cls.button_clean} >Отмена</span> : null}
              {idNum !== null ? <span className={`${cls.button_clean}`} onClick={() => {
              fetch('http://45.156.119.155:3002/contacts/delete', {
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
              }}>Удалить</span> : null}
            </div>
          </form>
          </div>
        </main>
      </header>
    </>
  );
}; 

export default Tables;
