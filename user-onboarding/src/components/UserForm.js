import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const UserForm = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Status has chnaged', status);
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className='user-form'>
      <Form>
        <label htmlFor='name'>Name</label>
        <Field id='name' type='text' name='name' placeholder='Name' />
        {touched.name && errors.name && (
          <p className='errors'>{errors.name}</p>
        )}
        <label htmlFor='email'>Email</label>
        <Field id='email' type='email' name='email' placeholder='johndoe@yahoo.com' />
        {touched.email && errors.email && (
          <p className='errors'>{errors.email}</p>
        )}
        <label htmlFor='password'>Password:</label>
        <Field id='password' type='password' name='password' placeholder='Password' />
        {touched.password && errors.password && (
          <p className='errors'>{errors.password}</p>
        )}
        <label className='checkbox' htmlFor='terms'>Terms of Service</label>
        <Field id='terms' type='checkbox' name='terms' checked={values.terms} />
        <span className='checkmark' />
        <button type='submit'>Submit</button>        
      </Form>
      {users.map(user => (
        <ul key={user.id}>
          <li>Name: {user.name}</li>
          <li>Email: {user.email}</li>
          <li>Password: {user.password}</li>
        </ul>
      ))}    
    </div>
  )
}

const FormUserForm = withFormik({
  mapPropsToValues({ name, email, password }) {
    return {
      name: name || '',
      email: '',
      password: ''
    }
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required()
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    console.log('submitting', values);
    axios.post('https://reqres.in/api/users', values).then(res => {
      setStatus(res.data);
      resetForm();
    }).catch(err => console.log(err.response));
  }
})(UserForm);

export default FormUserForm;