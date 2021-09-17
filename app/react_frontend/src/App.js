import React from 'react'
import { connect } from 'react-redux'

import { dashboard, login } from './actions/auth';
import { DashboardAPI } from './adapters/xhr/auth';

import Routes from './routes/index'
import ProcessBackdrop from './components/ProcessBackdrop';
import Base from './components/Wrapper/index'

function App(props) {
  console.log("APP LOADED")
  const { isAuthenticated } = props;
  
  const handleInitialAuth = async () => {
    try {
      const dashboard = await DashboardAPI.get();
      props.login(window.localStorage.getItem("token"), dashboard.username)
    } catch {
      window.localStorage.removeItem("token")
      window.location.reload()
    }
  }

  if (!isAuthenticated && window.localStorage.getItem("token")){
    handleInitialAuth()
  }

  return (
    <Base>
      <ProcessBackdrop />
      <Routes />
    </Base>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  dashboard: dashboard,
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
