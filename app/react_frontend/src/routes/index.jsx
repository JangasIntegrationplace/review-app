import React from 'react'
import AuthOnly from './auth'
import Generics from './generics'
import NoneAuthOnly from './open'

export default function Routes() {
  return (
    <React.Fragment>
      <AuthOnly />
      <NoneAuthOnly />
      <Generics />
    </React.Fragment>
  )
}
