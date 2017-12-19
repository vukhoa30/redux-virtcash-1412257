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
  if (!values.walletFromID) {
    errors.walletFromID = 'Bắt buộc'
  }

  if (!values.walletToID) {
    errors.walletToID = 'Bắt buộc'
  }

  if (!values.amount || values.amount <= 0) {
    errors.amount = 'Số tiền chuyển phải lớn hơn 0'
  }

  return errors
}

const submit = (values) => {
  var token = cookies.get('token');
  return fetch(host + '/api/transfer', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`,
    },
    body: JSON.stringify({
      "walletFromID": values.walletFromID,
      "walletToID": values.walletToID,
      "amount": values.amount
    })
  })
  .then(rslt => { 
    if (rslt.status === 401 || rslt.status === 400) {
      throw new SubmissionError({
        _error: 'Không tìm thấy ID ví cần chuyển tiền hoặc số tiền không đủ!'
      })
      return false;
    }
    return rslt.json(); 
  })
  .then(data => {
    if (data) {
      alert("Chuyển tiền thành công!");
      window.location.reload();
    }
  })
  .catch(err => { 
    console.log(err);
    throw new SubmissionError({
      _error: 'Không tìm thấy ID ví cần chuyển tiền hoặc số tiền không đủ!'
    })
  })
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <input {...input} placeholder={label} type={type} />
    <p className="sign-up-error">
      {touched && error && <span>{error}</span>}
    </p>
  </div>
)

const TransactionForm = props => {
  const { error, handleSubmit, pristine, reset, submitting } = props
  var walletOptions = null;
  if (props.wallets) {
    walletOptions = props.wallets.map((item, idx) => {
      return <option key={`walletOption_${idx}`} value={item._id}>{item._id}</option>
    })
  }
  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="row">
        <div className="col col-md-5">Mã ví tiền gửi:</div>
        <Field name="walletFromID" component="select">
          {walletOptions}
        </Field>
      </div>
      <br />
      <div className="row">
        <div className="col col-md-5">Mã ví tiền nhận:</div>
        <div className="col col-md-7">
          <Field name="walletToID" type="text" label="WalletID to transfer to"
            className="sign-in-input" component={renderField} />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col col-md-5">Số tiền:</div>
        <div className="col col-md-7">
          <Field name="amount" type="number" label="Amount to transfer"
            className="sign-in-input" component={renderField} />
        </div>
      </div>
      <div className="row sign-up-error">
        {error && <strong>{error}</strong>}
      </div>
      <br />
      <button type="submit" className="btn btn-primary">Gửi tiền</button>
    </form>
  )
}

export default reduxForm({
  form: 'Transaction', // a unique identifier for this form
  validate
})(TransactionForm)