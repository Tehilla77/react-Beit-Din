import React, { FC } from 'react';
import './logIn.scss';
import User from '../../models/User';
import { useFormik } from 'formik';
import * as Yup from 'yup'

interface LogInProps { 
  funcParentAdd:(user: User)=>void
  children:React.ReactNode
}

const LogIn: FC<LogInProps> = (props:LogInProps) => {
  const myForm = useFormik({
    initialValues: new User("id","password","first_name", "last_name","email","phone","address"),
    onSubmit: (valueForm: User) => {
      props.funcParentAdd(valueForm)
    },
    validationSchema: Yup.object().shape({
      // password: Yup.string().required().min(8)
      // .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase character')
      // .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase character')
      // .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
      // .matches(/^(?=.*[!@#%&])/, 'Must contain at least one special character'),
      first_name: Yup.string().required().min(2),
      last_name: Yup.string().required().min(2)
    })
  })

  return <div className="user-details">
    <form onSubmit={myForm.handleSubmit} className='col-sm-6 m-5'>
      <h2 className='mt-5'>{props.children}</h2>

      <div className='form-group mt-3'>
        <label>שם פרטי</label>
        <input name='first_name' onChange={myForm.handleChange} className={myForm.errors.first_name? 'form-control is-invalid' : 'form-control' }></input>
        {myForm.errors.first_name ? <small>{myForm.errors.first_name}</small> : ''}
      </div>

      <div className='form-group mt-3'>
        <label>שם משפחה</label>
        <input name='last_name' onChange={myForm.handleChange} className={myForm.errors.last_name? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.last_name ? <small>{myForm.errors.last_name}</small> : ''}

      </div>

    <div className='form-group mt-3'>
        <label>סיסמה</label>
        <input name='password' onChange={myForm.handleChange} className={myForm.errors.password ? 'form-control is-invalid' : 'form-control'}></input>
        {myForm.errors.password ? <small>{myForm.errors.password}</small> : ''}
      </div>

      <button type='submit' className='btn btn-warning mt-5'>הכנס</button>
    </form>
  </div>
}

export default LogIn;
