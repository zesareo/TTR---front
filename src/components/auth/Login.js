import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import AuthService from '../../services/AuthService';

const useStyles = makeStyles({
  root: {
    maxWidth: 275,
    margin: '200px auto',
    WebkitBoxShadow: '1px 3px 1px #9E9E9E'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 auto',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  div: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  }
});

export default function Login() {
  const classes = useStyles();

  const [auth, setAuth] = React.useState(false);
  const [userAuth, setUserAuth] = React.useState({
    user: '',
    pass: ''
  });

  const { user, pass } = userAuth;

  const handleAuth = e => {
    e.preventDefault();
    console.log(userAuth);
    if (user === '' || pass === '') {
      return;
    }

    AuthService.login().then(r => {
      console.log(r);
    })
  }

  const handleChange = e => {
    setUserAuth({
      ...userAuth,
      [e.target.name]: e.target.value
    })
  }

  return (

    <div>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            Inicia Sesión
        </Typography >
          <Typography style={{ marginBottom: 20 }} className={classes.title} color="textSecondary" gutterBottom>
            Bienvenido PAW
          </Typography>

          <form onSubmit={handleAuth}>
            <TextField
              required
              name='user'
              value={user}
              id="outlined-required"
              label="Usuario"
              variant="outlined"
              style={{ marginBottom: 20 }}
              onChange={handleChange}
            />

            <TextField
              required
              name='pass'
              value={pass}
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              style={{ marginBottom: 20 }}
              onChange={handleChange}
            />
          </form>

        </CardContent>
        <CardActions>
          <div style={{ display: 'flex', justifyContent: 'end', alignContent: 'end' }}>
            <Button variant="outlined" onClick={handleAuth} color="primary">
              Ingresar
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>

  );
}
