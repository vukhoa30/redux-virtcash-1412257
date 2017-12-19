import React from 'react'
import Cookies from 'universal-cookie'
import { Field, reduxForm } from 'redux-form'
import { SubmissionError } from 'redux-form'
import host from '../../host'

import '../SignUp/SignUp.css'
//import '../SignIn/SignIn.css'

const cookies = new Cookies();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values) {
  return fetch(host + '/api/sign-in', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    })
  })
  .then(rslt => { 
    if (rslt.status === 401 || rslt.status === 400) { 
      throw new SubmissionError({
        _error: 'Email hoặc mật khẩu không đúng!'
      })
      return false;
    }
    return rslt.json(); 
  })
  .then(data => {
    if (data) {
      cookies.set('token', data.token, { path: '/' });
      window.location.assign("/");
    }
  })
  .catch(err => { 
    console.log(err); 
    throw new SubmissionError({
      _error: 'Email hoặc mật khẩu không đúng!'
    })
  });
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    {touched && error && <span>{error}</span>}
  </div>
)

const SignInForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="row">
        <div className="col col-md-5">Email: </div>
        <div className="col col-md-7">
          <Field name="email" type="text" label="Email"
            className="sign-in-input" component={renderField} />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col col-md-5">Mật khẩu: </div>
        <div className="col col-md-7">
          <Field name="password" type="password" label="Password"
            className="sign-in-input" component={renderField} />
        </div>
      </div>
      <br />
      {error && <strong>{error}</strong>}
      <div className="row sign-in-right">
        <button type="submit" className="btn btn-success"
          disabled={submitting}>Sign in
        </button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'SignIn', // a unique identifier for this form
})(SignInForm)