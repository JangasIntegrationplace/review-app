import React from 'react';
import clsx from 'clsx';

import { SETTINGS_PATH } from './../../../constants/react-routes/auth'

import ListItemRouterLink from "./../../../components/ListItemRouterLink"

import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import SettingsIcon from '@material-ui/icons/Settings';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import DevicesIcon from '@material-ui/icons/Devices';
import DraftsIcon from '@material-ui/icons/Drafts';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    position: 'static',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper),
      }}
      open={true}
    >
      <List>
        <ListItemRouterLink path={SETTINGS_PATH}>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="General" />
        </ListItemRouterLink>
        <ListItemRouterLink path={`${SETTINGS_PATH}/credentials`}>
          <ListItemIcon>
            <VpnKeyIcon />
          </ListItemIcon>
          <ListItemText primary="Credentials" />
        </ListItemRouterLink>
        <ListItemRouterLink path={`${SETTINGS_PATH}/devices`}>
          <ListItemIcon>
            <DevicesIcon />
          </ListItemIcon>
          <ListItemText primary="Devices" />
        </ListItemRouterLink>
        <ListItemRouterLink path={`${SETTINGS_PATH}/email`}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Email Settings" />
        </ListItemRouterLink>
      </List>
    </Drawer>
  );
}
