import React from 'react'
import { connect } from 'react-redux'
import { Route } from "react-router-dom";

import JangasCodingplace from '../pages/Deliveries/JangasCodingplace';
import { ReviewDetail } from '../pages/Deliveries/JangasCodingplace/reviewDetail';
import { GenericDelivery } from '../pages/Deliveries/Generic';


export const AuthOnly = (props) => {
  const { isAuthenticated } = props;

  if (!isAuthenticated) return <React.Fragment></React.Fragment>

  return (
    <React.Fragment>
      <Route exact path="/delivery/:delivery" component={GenericDelivery} />
      <Route exact path="/sample/:sampleId/:reviewId" component={ReviewDetail} />
      <Route exact path="/" component={JangasCodingplace} />
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthOnly)
