import React, { Component } from 'react'
import './App.css'
import Main from '../../routes'
import Header from '../Header/Header'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const App = ({ p_userInfo, p_setCurrentUserInfo }) => {
  let updateUserInfo = () => {
    var token = cookies.get('token');
    if (token) {
      fetch('/api/user-info', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`,
        }
      })
      .then(rslt => { return rslt.json(); })
      .then(data => {
        if (data !== p_userInfo) {
          p_setCurrentUserInfo(data);
        }
      })
      .catch(err => { console.log(err) })
    }
  }

  if (!p_userInfo) {
    updateUserInfo();
  }
  return (
    <div className="container">
      <Header userInfo={p_userInfo} />
      <div className="app-background">
        <Main userInfo={p_userInfo} />
      </div>
    </div>
  )
}

export default App
