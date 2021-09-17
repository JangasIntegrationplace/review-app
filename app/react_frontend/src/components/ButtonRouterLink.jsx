import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';


export default function ButtonRouterLink(props){
  const { path, text } = props;

  return (
    <Button color="inherit">
      <Link
        to={path}
        component={RouterLink}
        underline="none"
        color="inherit"
      >
        {text}
      </Link>
    </Button>
  )
}
