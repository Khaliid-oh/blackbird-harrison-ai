import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/logo.svg';
import EmailValidator from 'email-validator';


export default function LoginForm() {
  const [showAlert, setShowAlert] = useState({display: false, type: ''});
  const [notification, setNotification] = useState({emailError:'', passwordError:'', login:''})


  const validateForm = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');


    if (!email.trim()&&!password.trim()) {
      setNotification({...notification, emailError: 'Please enter your email', passwordError: 'Please enter your password'})
      setShowAlert({...showAlert, display: true, type:'email-password-error'})
      setTimeout(() => {
        setNotification({...notification, emailError: '', passwordError: ''})
        setShowAlert({...showAlert, display: false, type:''})
      }, 2000);
        return false;
  }
    
    if (!email.trim()) {
        setNotification({...notification, emailError: 'Please enter your email'})
        setShowAlert({...showAlert, display: true, type:'email-error'})
        setTimeout(() => {
          setNotification({...notification, emailError: ''})
          setShowAlert({...showAlert, display: false, type:''})
        }, 2000);
          return false;
    }
    

    if (!password.trim()) {
      setNotification({...notification, passwordError: 'Please enter your password'})
      setShowAlert({...showAlert, display: true, type:'password-error'})
      setTimeout(() => {
        setNotification({...notification, passwordError: ''})
        setShowAlert({...showAlert, display: false, type:''})
      }, 2000);
      return false;
    }

    // Add validation code here

    const validateEmail = EmailValidator.validate(email) 
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&-])[A-Za-z0-9@$!%*?&-]{8,}$/;
    const validatePassword = regex.test(password)

    if (!validateEmail&&!validatePassword) {
      setNotification({...notification, emailError: 'Email is not valid', passwordError: 'Password is not valid'})
      setShowAlert({...showAlert, display: true, type:'email-password-error'})
      setTimeout(() => {
        setNotification({...notification, emailError: '', passwordError: ''})
        setShowAlert({...showAlert, display: false, type:''})
      }, 3000);
        return false;
  }
    
    if (!validateEmail) {
        setNotification({...notification, emailError: 'Email is not valid'})
        setShowAlert({...showAlert, display: true, type:'email-error'})
        setTimeout(() => {
          setNotification({...notification, emailError: ''})
          setShowAlert({...showAlert, display: false, type:''})
        }, 3000);
        return false;
    }
    

    if (!validatePassword) {
      setNotification({...notification, passwordError: 'Password is not valid'})
      setShowAlert({...showAlert, display: true, type:'password-error'})
      setTimeout(() => {
        setNotification({...notification, passwordError: ''})
        setShowAlert({...showAlert, display: false, type:''})
      }, 3000);
      return false;
    }
    return true;

  };

  


  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    if (validateForm(event)) {
      setShowAlert({...showAlert, display: true, type:'success'})
      setTimeout(() => {
        setShowAlert({...showAlert, display: false, type:''})
      }, 3000);
    }
  
  };   

  return (
    <>
    
        <Snackbar
          open={showAlert.display&&showAlert.type === 'success' ? true : false}
          autoHideDuration={6000}
  

        >
          <Alert>Login Successful</Alert>
        </Snackbar>
  
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box sx={{
            my: 2
          }}>
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              error={showAlert.display&&showAlert.type  ==='email-password-error' ? true : showAlert.display&&showAlert.type  ==='email-error' ? true :  false }
              helperText= {<div data-testid='test-id-email'>{notification.emailError}</div>} 
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              error={showAlert.display&&showAlert.type === 'email-password-error' ? true : showAlert.display&&showAlert.type === 'password-error' ? true : false}
              helperText= {<div data-testid='test-id-password'>{notification.passwordError}</div>}
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
