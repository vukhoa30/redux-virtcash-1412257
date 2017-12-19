import React, { Component } from 'react'
import Cookies from 'universal-cookie'
import SignInForm from '../SignInForm/SignInForm'

import './SignIn.css';
import '../SignUp/SignUp.css'

const cookies = new Cookies();

export default class SignIn extends Component {
  render() {
    return (
      <div className="sign-in-padding-panel">
        <div className="panel panel-default sign-in-panel">
          <div className="panel-body">
            <SignInForm />
          </div>
        </div>
      </div>
    );
  }
}