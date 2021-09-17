import React from 'react'
import { connect } from 'react-redux'

import Typography from '@material-ui/core/Typography';

export const Devices = (props) => {
  return (
    <React.Fragment>
      <Typography component="h1" variant="h5">
        Active Devices
      </Typography>
    </React.Fragment>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Devices)
