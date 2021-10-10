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
  import {useCartContext} from '../context/cartContext'
  import {useRouter} from 'next/router'
  import {useForm} from 'react-hook-form'
  import { useSnackbar } from "notistack";
  import dynamic from 'next/dynamic'
import CustomTextField from "../components/customTextField";
import StepWizard from "../components/stepWizard";
  
  function Shipping() {
    const classes = useStyles();
    // const [credentials,setCredentials]= useState({email:'', password:'', name:'' , confirmPassword:''})
    // const [state, dispatc] = useUserContext()
    const [cart, dispatch] = useCartContext()
    const {shippingInfo} = cart;
    const router = useRouter()
    const {redirect} = router.query;
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const {control, handleSubmit} = useForm({defaultValues:{
        fullname:shippingInfo?.fullname,
        address:shippingInfo?.address,
        city:shippingInfo?.city,
        postalcode:shippingInfo?.postalcode,
        country:shippingInfo?.country
    }})
    React.useEffect(()=>{
    //   if(state.user){
    //     router.push('/')
    //   }
    //   console.log(shippingInfo,"shipping info")
    },[])
    // console.log(redirect,'redirect')
    const onSubmit = async (credentials) => {
        console.log(credentials)
        Cookies.set("shippingInfo",JSON.stringify(credentials))
        dispatch({type:"SAVE_SHIPPING_INFO", payload:credentials})
        router.push('/payment')
    //     if(credentials.password !== credentials.confirmPassword) {
    //         enqueueSnackbar("Password doesn't match")
    //         return;
    //     }
    //     closeSnackbar()
    //   try {
    //     const {data} = await axios.post('/api/users/register',credentials) 
    //     dispatch({type:"Login",payload:data})
    //     // console.log(redirect)
    //     Cookies.set('user',JSON.stringify(data))
    //     router.push(redirect || '/')
    //   } catch (error) {
    //     console.log(error)
    //     enqueueSnackbar(error.response?.data?.message || error.message , {variant:"error"})
    //   }
    }
    
    return (
      <>
        <Layout title="Shipping">
          <StepWizard activeStep={1} />
          <form className={classes.form} >
            <List>
            <ListItem>
                <CustomTextField 
              name="fullname"
              label="Fullname"
              control={control}
              rules={{
                required:true,
                // pattern:{value:/^[a-zA-Z]+$/,message:'Must contain only characters'}               
              }}

              />
              </ListItem>
              <ListItem>
                <CustomTextField 
              name="address"
              label="Addresss"
              control={control}
              rules={{
                required:true,
                // minLength:{value:6,message:"Password have minimum value of 6"},
                // pattern:{value:/^[^@]+@[^@]+\.[^@.]{2,}$/,message:'Please input a valid email'}
              }}

              />
              </ListItem>
              <ListItem>
                <CustomTextField 
              name="city"
              label="City"
              control={control}
              rules={{
                required:true,
                // pattern:{value:/^[a-zA-Z]+$/,message:'Must contain only characters'}
              }}

              />
              </ListItem>
              <ListItem>
                <CustomTextField 
              name="postalcode"
              label="Postal Code"
              control={control}
              rules={{
                required:true,
                // pattern:{value:/^[a-zA-Z]+$/,message:'Must contain only characters'}
              }}

              />
              </ListItem>

              <ListItem>
              <CustomTextField 
              name="country"
              label="Country"
              control={control}
              rules={{
                required:true,
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
                Continue
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
//   export default Shipping;
  
  export default dynamic(()=>Promise.resolve(Shipping));
