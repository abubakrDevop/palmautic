import Header from "components/Headers/Header.js";
import cls from '../../assets/scss/react/_customTables.module.scss'
import { IoIosSearch } from 'react-icons/io'
import { useForm } from "react-hook-form";
import { Form } from "../../helpers/form"

const Tables = () => {
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
        accountId: id,
        phone: data.number,
        email: data.email,
        name: data.name,
        linkedin: data.linkedin,
        company: data.company
      })
    })
  }

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
  .then(json => console.log(json))

  return (
    <>
      <Header />
      <header className={cls.header}>
        <h1 className={cls.headTitle}>Contacts</h1>
        <main className={cls.main}>
          <div className={`${cls.contacts} ${cls.div}`}>
            <section className={cls.section}>
              <label className={cls.label}> 
                Upload
                <input type="file" className={cls.file} />
              </label>
              <div className={cls.searchBox}>
                <input type="search" className={cls.search} placeholder="Search..." />
                  <IoIosSearch className={cls.icon} />
              </div>
            </section>
            <section className={cls.headTitles}>
              <p className={cls.headTitles_text}>Name</p>
              <p className={cls.headTitles_text}>Email</p>
              <p className={cls.headTitles_text}>Phone</p>
              <p className={cls.headTitles_text}>Company</p>
              <p className={cls.headTitles_text}>Linkedin</p>
              <p className={cls.headTitles_text}>Sequence</p>
              <p className={cls.headTitles_text}>Active</p>
            </section>
            <section className={cls.contactInner}>
              
            </section>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className={`${cls.addInputs} ${cls.div}`}>
            <h1 className={cls.headTitle}>Add your contact</h1>

            {
              formState.errors.name && <span className={cls.errors}> {formState.errors.name.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Your name..." 
              {...register('name', Form.Options.allInputs)}
            />

            {
              formState.errors.email && <span className={cls.errors}> {formState.errors.email.message} </span>
            }

            <input 
              className={cls.input} 
              type="email" 
              placeholder="Your email..." 
              {...register('email', Form.Options.email)}
            />

            {
              formState.errors.number && <span className={cls.errors}> {formState.errors.number.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Your number..." 
              {...register('number', Form.Options.allInputs)}
            />

            {
              formState.errors.linkedin && <span className={cls.errors}> {formState.errors.linkedin.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Your linkedin" 
              {...register('linkedin', Form.Options.allInputs)}
            />

            {
              formState.errors.company && <span className={cls.errors}> {formState.errors.company.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Your company name..." 
              {...register('company', Form.Options.allInputs)}
            />

            {
              formState.errors.sequence && <span className={cls.errors}> {formState.errors.sequence.message} </span>
            }

            <input 
              className={cls.input} 
              type="text" 
              placeholder="Your sequence..." 
              {...register('sequence', Form.Options.allInputs)}
            />

            <button className={cls.button} type="submit">Add to list</button>
          </form>
        </main>
      </header>
    </>
  );
}; 

export default Tables;
