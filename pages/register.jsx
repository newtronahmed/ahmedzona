import {
    Link,
    List,
    ListItem,
    TextField,
    Typography,
    InputAdornment,
    Button,
  } from "@material-ui/core";
  import React,{useState} from "react";
  import Cookies from 'js-cookie'
  import NextLink from "next/link";
  import Layout from "../components/layout";
  import { useStyles } from "../utils/style";
  import axios from 'axios'
  import {useUserContext} from '../context/userContext'
  import {useRouter} from 'next/router'
  import {useForm} from 'react-hook-form'
  import { useSnackbar } from "notistack";
import CustomTextField from "../components/customTextField";
  
  function Register() {
    const classes = useStyles();
    // const [credentials,setCredentials]= useState({email:'', password:'', name:'' , confirmPassword:''})
    const {control, handleSubmit} = useForm()
    const [state, dispatch] = useUserContext()
    const router = useRouter()
    const {redirect} = router.query;
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    React.useEffect(()=>{
      if(state.user){
        router.push('/')
      }
      // console.log(redirect)
    },[])
    // console.log(redirect,'redirect')
    const onSubmit = async (credentials) => {
        console.log(credentials)
        if(credentials.password !== credentials.confirmPassword) {
            enqueueSnackbar("Password doesn't match")
            return;
        }
        closeSnackbar()
      try {
        const {data} = await axios.post('/api/users/register',credentials) 
        dispatch({type:"Login",payload:data})
        // console.log(redirect)
        Cookies.set('user',JSON.stringify(data))
        router.push(redirect || '/')
      } catch (error) {
        console.log(error)
        enqueueSnackbar(error.response?.data?.message || error.message , {variant:"error"})
      }
    }
    
    return (
      <>
        <Layout title="Register">
          <Typography component="h1" variant="h1" align="center">
            Register
          </Typography>
          <form className={classes.form} >
            <List>
            <ListItem>
                {/* <TextField
                  label="Name"
                  id="name"
                  inputProps={{ type: "text" }}
                  variant="outlined"
                  fullWidth
                  required
                  value={credentials.name}
                  onChange={(e)=>setCredentials({...credentials, name:e.target.value})}
                ></TextField> */}
                <CustomTextField 
              name="name"
              label="Name"
              control={control}
              rules={{
                required:true,
                pattern:{value:/^[a-zA-Z]+$/,message:'Must contain only characters'}               
              }}

              />
              </ListItem>
              <ListItem>
                {/* <TextField
                  label="Email"
                  id="email"
                  inputProps={{ type: "email" }}
                  variant="outlined"
                  fullWidth
                  required
                  value={credentials.email}
                  onChange={(e)=>setCredentials({...credentials, email:e.target.value})}
                ></TextField> */}
                <CustomTextField 
              name="email"
              label="Email"
              control={control}
              type='email'
              rules={{
                required:true,
                // minLength:{value:6,message:"Password have minimum value of 6"},
                pattern:{value:/^[^@]+@[^@]+\.[^@.]{2,}$/,message:'Please input a valid email'}
              }}

              />
              </ListItem>
              <ListItem>
                {/* <TextField
                  label="password"
                  inputProps={{ type: "password" }}
                  id="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={credentials.password}
                  onChange={(e)=>setCredentials({...credentials, password:e.target.value}, )}
                /> */}
                <CustomTextField 
              name="password"
              label="Password"
              control={control}
              type="password"
              rules={{
                required:true,
                minLength:{value:6,message:"Password have minimum value of 6"},
                // pattern:{value:/^[a-zA-Z]+$/,message:'Must contain only characters'}
                
              }}

              />
              </ListItem>
              <ListItem>
              <CustomTextField 
              name="confirmPassword"
              label="Confirm Password"
              control={control}
              type="password"
              rules={{
                required:true,
                minLength:{value:6,message:"Password have minimum value of 6"},
                // pattern:{value:/^[a-zA-Z]+$/,message:'Must contain only characters'}
                
              }}

              />
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Register
                </Button>
              </ListItem>
              <ListItem>
                Already have an account ? &nbsp;
                <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
                  <Link>Login</Link>
                </NextLink>
              </ListItem>
            </List>
          </form>
        </Layout>
      </>
    );
  }
  
  export default Register;