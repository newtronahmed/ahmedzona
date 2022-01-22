import {
  Link,
  List,
  ListItem,
  TextField,
  Typography,
  InputAdornment,
  Grid,
  Button,
  ButtonBase,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import Cookies from 'js-cookie'
import NextLink from "next/link";
import Layout from "../components/layout";
import { useStyles } from "../utils/style";
import axios from 'axios'
import { useUserContext } from '../context/userContext'
import { useRouter } from 'next/router'
import CustomTextField from "../components/customTextField";
import { useSnackbar } from "notistack";

function Login() {
  const classes = useStyles();
  // const [credentials,setCredentials]= useState({email:'', password:''})
  const [state, dispatch] = useUserContext()
  const router = useRouter()
  const { redirect } = router.query;
  const { control, handleSubmit } = useForm()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  React.useEffect(() => {
    if (state.user) {
      router.push('/')
    }
    // console.log(redirect)
  }, [])
  // console.log(redirect,'redirect')
  const onSubmit = async (credentials) => {
    console.log(credentials)
    // e.preventDefault()
    closeSnackbar()
    try {
      const { data } = await axios.post('/api/users/login', credentials)
      // console.log(data)
      dispatch({ type: "Login", payload: data })
      // console.log(redirect)
      Cookies.set('user', JSON.stringify(data))
      router.push(redirect || '/')
    } catch (error) {
      // console.log(error)
      enqueueSnackbar(error.response?.data.message || error.message, { variant: "error" })
    }
  }

  return (
    <>
      <Layout title="Login">
        <Grid container >
          <Grid item sm={5}>
            <Paper>
              <Typography component="h1" variant="h1" align="center">
                Login
              </Typography>
              <ListItem>
                <Button className={classes.authLoginButton} fullWidth variant="outlined" color="primary">
                  <img width="30" height="30" src="/images/google.png" />
                  <span>Login with google</span>
                </Button>
              </ListItem>
              <form className={""} >
                <List>
                  <ListItem>

                    <CustomTextField name="email" type={"email"} label="Email" rules={{
                      required: 'First name is required',
                      pattern: { value: /^[^@]+@[^@]+\.[^@.]{2,}$/, message: 'Please input a valid email' }
                    }} control={control} />
                  </ListItem>
                  <ListItem>
                    {/* <TextField
                label="password"
                inputProps={{ type: "password" }}
                id="password"
                variant="outlined"
                fullWidth
                error={Boolean(errors.password)}
                // required
                ref={register({required:"Password is required"})}
                helperText={errors.password ? errors.password.message : ''}
                // value={credentials.password}
                onChange={(e)=>setCredentials({...credentials, password:e.target.value}, )}
              /> */}
                    <CustomTextField
                      name="password"
                      label="Password"
                      control={control}
                      type="password"

                      rules={{
                        required: true,
                        minLength: { value: 6, message: "Password have minimum value of 6" },
                        // pattern:{value:/^[a-zA-Z]+$/,message:'Must contain only characters'}

                      }}
                    >

                    </CustomTextField>
                  </ListItem>

                  <ListItem>
                    <Button
                      fullWidth
                      variant="contained"
                      type="submit"
                      color="primary"
                      onClick={handleSubmit(onSubmit)}
                    >
                      Login
                    </Button>
                  </ListItem>
                  <ListItem>
                    Don't have an account ? &nbsp;
                    <NextLink href={`/register?redirect=${redirect || '/'}`} passHref>
                      <Link>Register</Link>
                    </NextLink>
                  </ListItem>
                </List>
              </form>
            </Paper>

          </Grid>
          <Grid item sm={7}  >
            <div className={classes.login_container}>
            {/* <img src="/images/login.jpg" className={classes.login_banner} /> */}
            <div className={classes.overlay}>

            </div>
            </div>
          </Grid>
        </Grid>
      </Layout>
    </>
  );
}

export default Login;
