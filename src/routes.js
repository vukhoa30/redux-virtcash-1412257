import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import HomeContainer from './containers/HomeContainer'
import About from './components/About/About'
import NotFound from './components/NotFound/NotFound'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'

class Main extends Component {
  render() {
    const userInfo = this.props.userInfo;
    return (
      <main>
        <Switch>
          <Route exact path='/' 
            render={(props) => <HomeContainer {...props} userInfo={userInfo} />}
          />
          <Route path='/about' component={About}/>
          <Route path='/sign-in'
            render={(props) => <SignIn {...props} userInfo={userInfo} />}
          />
          <Route exact path='/sign-up'
            render={(props) => <SignUp {...props} />}
          />
          <Route path='*' component={NotFound}/>
        </Switch>
      </main>
    )
  }
}

export default Main
