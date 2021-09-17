import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import { Link as RouterLink } from 'react-router-dom';


export default function ListItemRouterLink(props){
  const { path } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <RouterLink
          ref={ref}
          to={path}
          underline="none"
          color="inherit"
          {...linkProps}
        />
      )
    ), [path]
  )

  return (
    <ListItem button component={CustomLink}>
      {props.children}
    </ListItem>
  )
}
