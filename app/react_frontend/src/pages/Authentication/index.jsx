import React from 'react'
import { connect } from 'react-redux'

import { AUTH_PATH } from '../../constants/react-routes/open';

import SignIn from './SignIn/index'
import SignUp from './SignUp/index'

import Container from '@material-ui/core/Container';


function getComponent(){
  const path = window.location.pathname;
  switch (path){
    case `${AUTH_PATH}/signup`:
      return <SignUp />
    default:
      return <SignIn />
  }
}

export const Authentication = (props) => {
  return (
    <Container maxWidth="xs">
      {getComponent()}
    </Container>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication)
