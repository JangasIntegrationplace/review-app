import React from 'react'

import Wrapper from "./Wrapper/index";
import General from './General/index';
import Credentials from "./Credentials/index";
import Email from "./Email/index";
import Devices from "./Devices/index";

import { SETTINGS_PATH } from '../../constants/react-routes/auth';


function getComponent(){
  const path = window.location.pathname;
  switch (path){
    case `${SETTINGS_PATH}/credentials`:
      return <Credentials />
    case `${SETTINGS_PATH}/email`:
      return <Email />
    case `${SETTINGS_PATH}/devices`:
      return <Devices />
    default:
      return <General />
  }
}

export const Settings = () => {
  return (
    <Wrapper>
      {getComponent()}
    </Wrapper>
  )
}
