import React from 'react';

import Nav from './nav.jsx';
import Footer from './footer.jsx';

import CssBaseline from '@material-ui/core/CssBaseline';


export default function Base(props){
  return (
    <>
      <CssBaseline />
      <Nav />
      <main style={{marginTop: '70px'}}>
        {props.children}
      </main>
      <Footer />
    </>
  )
}
