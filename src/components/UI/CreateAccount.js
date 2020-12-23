import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import create from '../../assets/create.svg'
import { makeStyles } from '@material-ui/styles'
import { TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  create: {
    height: '3em',
    background: '#1CBBB4',
    borderRadius: '100px'
  },

  createAccount: {
    width: 400,
    height: 50,
    fontSize: '1rem',
    background: '#1CBBB4'
  }
}));

export default function CreateAccount() {

  const classes = useStyles();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('')



  const changeUser = (event) => {
    setUser(event.target.value)
  }

  const changePassword = (event) => {
    setPassword(event.target.value)
  }

    return (
        <div>
		      <Grid container style={{position: 'relative'}}>
		      	<Grid item container direction='column' alignItems='center' style={{position: 'absolute', transform: 'translateY(100%)'}}> 
              <Grid item>
                <img src={create} className={classes.create} alt='create' />
              </Grid>
              <Grid item>
                <Typography variant='h3' className={classes.text}>Create Account</Typography>
              </Grid>
              <Grid item>
                <TextField 
                  id='user'
                  label='Add a user *' 
                  variant='outlined'
                  value={user}
                  onChange={changeUser}
                />
				      </Grid> 
              <Grid item>
                <TextField
                  type='password'
                  label='Add a password *' 
                  id='password' 
                  variant='outlined'  
                  value={password}
                  onChange={changePassword}
				        />
              </Grid>
              <Grid item>
                <Button
                  disableFocusRipple
                  className={classes.createAccount} 
                  variant='contained'
                  disabled={user.length === 0 || password.length === 0}
                  >
                  Create Account
                </Button>
              </Grid>
		      	</Grid>
		      </Grid>          
        </div>
    )
}
