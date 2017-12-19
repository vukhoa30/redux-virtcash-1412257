import React from 'react'
import Cookies from 'universal-cookie'
import { Field, reduxForm } from 'redux-form'
import { SubmissionError } from 'redux-form'
import host from '../../host'

import '../SignUp/SignUp.css'
import '../SignIn/SignIn.css'

const cookies = new Cookies();
var succeed = false;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const validate = values => {
  const errors = {}
  if (!values.email) {
    errors.email = 'Bắt buộc'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email không hợp lệ'
  }

  if (!values.password || values.password.length < 6) {
    errors.password = 'Mật khẩu phải có ít nhất 6 ký tự'
  }

  if (values.password !== values.repeatPassword) {
    errors.repeatPassword = 'Mật khẩu nhập lại không đúng'
  }
  return errors
}

function submit(values) {
  return fetch(host + '/api/register', {
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
    if (rslt.status === 400 || rslt.status === 401) { 
      throw new SubmissionError({
        _error: 'Email đã được sử dụng để đăng ký!'
      })
      return false; 
    }
    return rslt.json(); 
  })
  .then(data => {
    if (data) {
      succeed = true;
      console.log(data);
      this.forceUpdate();
    }
  })
  .catch(err => { 
    console.log(err); 
    throw new SubmissionError({
      _error: 'Email đã được sử dụng để đăng ký!'
    })
  });
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    <p className="sign-up-error">
      {touched && error && <span>{error}</span>}
    </p>
  </div>
)

const SignUpForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  if (succeed) {
    return (
      <div className="panel panel-default sign-up-text-center sign-up-succes-panel">
        <div className="panel-body">
          <h1>Đăng ký thành công! <a href="/sign-in">Đăng nhập</a></h1>
        </div>
      </div>
    )
  }
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
        <div className="col col-md-7">
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col col-md-5">Xác nhận mật khẩu: </div>
        <div className="col col-md-7">
          <Field name="repeatPassword" type="password" label="Confirm Password"
            className="sign-in-input" component={renderField} />
        </div>
        <div className="col col-md-7">
        </div>
      </div>
      <br />
      <div className="row sign-up-error">
        {error && <strong>{error}</strong>}
      </div>
      <div className="row sign-in-right">
        <button type="submit" className="btn btn-primary sign-up">Sign Up</button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'SignUp', // a unique identifier for this form
  validate
})(SignUpForm)