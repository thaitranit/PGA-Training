import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ILoginParams, ILoginValidation } from '../../../models/auth';
import { validateLogin, validLogin } from '../utils';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Container from '@material-ui/core/Container';
import Stack from '@mui/material/Stack';
import Box from '@material-ui/core/Box';
import {useForm} from "react-hook-form"
import message from 'react-intl/src/components/message';
import LoginIcon from '@mui/icons-material/Login';

interface Props {
  onLogin(values: ILoginParams): void;
  // loading: boolean;
  // errorMessage: string;
}

const LoginForm = (props: Props) => {
  const { onLogin } = props;
  const {
    register, 
    handleSubmit,
    formState:{errors},
  } = useForm();
  const onSubmit = (values: any) => {
     onLogin(values);

    console.log(values)
  };

 

  return (
    
      
    
   <Container maxWidth="xs">
     <form onSubmit={handleSubmit(onSubmit)}> 
    <Box mb={2}>
    <TextField 
    margin="normal" 
    variant="outlined" 
    label="Email" 
    fullWidth 
    autoComplete="email" 
    autoFocus
    {...register("email", {required: "Email invalid",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    }
    })}
    error = {!!errors?.email}
    helperText={errors?.email ? errors.email.message : null}
    />

    <TextField 
    margin= "normal" 
    variant="outlined" 
    label="Password" 
    fullWidth 
    autoComplete="password" 
    type="password"
    // autoFocus
    {...register("password", {required: "Password Password must be at least 6 characters long, and capital letter at the beginning",
    minLength: 6 
    
  })

    }
    error = {!!errors?.password}
    helperText = {errors?.password ? errors.password.message :null}
    />

  </Box>
    <Button type="submit" variant="contained" color="success" fullWidth>
      <LoginIcon />
      Login
      </Button>
    </form>
    </Container>
      
  );
};

export default LoginForm;
