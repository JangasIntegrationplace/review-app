import React from 'react'

import Terms from './Terms/index';

import Container from '@material-ui/core/Container';

function getComponent(){
  const path = window.location.pathname;
  switch (path){
    default:
      return <Terms />
  }
}

export function General() {
  return (
    <Container maxWidth="md">
      {getComponent()}
    </Container>
  )
}
