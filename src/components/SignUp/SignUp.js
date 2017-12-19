import React from 'react';
import { LinkedComponent } from 'valuelink'; 
import { Input } from 'valuelink/tags';
import SignUpForm from '../SignUpForm/SignUpForm'

import './SignUp.css';
import '../SignIn/SignIn.css'

export default class SignUp extends LinkedComponent {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="sign-in-padding-panel">
        <div className="panel panel-default sign-in-panel">
          <div className="panel-body">
            <SignUpForm />
          </div>
        </div>
      </div>
    );
  }
}
