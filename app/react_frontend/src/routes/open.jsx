import React from 'react'
import { connect } from 'react-redux'
import { Route } from "react-router-dom";

import Authentication  from '../pages/Authentication/index';

export const NoneAuthOnly = (props) => {
  const { isAuthenticated } = props;

  if (isAuthenticated) return <React.Fragment></React.Fragment>

  return (
    <React.Fragment>
      <Route component={Authentication} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(NoneAuthOnly)
