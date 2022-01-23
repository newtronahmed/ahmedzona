import React,{useEffect} from "react";
import StepWizard from "../components/stepWizard";
import Layout from '../components/layout'
import { useStyles } from "../utils/style";
import {useRouter} from "next/router";
import { FormLabel, RadioGroup, FormControlLabel , FormControl, Radio, Typography, List, ListItem , Button} from "@material-ui/core";
import Cookies from "js-cookie";
import { useCartContext } from "../context/cartContext";
import {useSnackbar} from 'notistack'
function Payment() {
  const classes= useStyles()
  const [paymentMethod, setValue] = React.useState('');
  const router = useRouter() 
  const [cart,dispatch] = useCartContext()
  const {shippingInfo} = cart
  const {enqueueSnackbar,closeSnackbar} = useSnackbar()
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(()=>{
      if(!shippingInfo.address){
          router.push('/shipping')
      }else {
          setValue(Cookies.get("paymentMethod"))
      }
  },[])
  const handleSubmit = (e) =>{
      closeSnackbar()
    if(!paymentMethod){
        enqueueSnackbar("Payment method not selected" , {variant:"error"})
        return
    }
    dispatch({type:"SAVE_PAYMENT_METHOD", payload:paymentMethod})
    Cookies.set("paymentMethod", paymentMethod)
    router.push("/order")
  }
  return (
    <Layout title="Payment">
      <StepWizard activeStep={2} />
      <form className={classes.form}>
      <Typography variant="h1" >Payment</Typography>
      <List>
          <ListItem>
      <FormControl component="fieldset">
        <FormLabel component="legend">Choose</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="controlled-radio-buttons-group"
          value={paymentMethod}
          onChange={handleChange}
        >
          <FormControlLabel value="paypal" control={<Radio />} label="Paypal" />
          <FormControlLabel value="stripe" control={<Radio />} label="Stripe" />
          <FormControlLabel value="cash" control={<Radio />} label="Cash" />
        </RadioGroup>
      </FormControl>
      </ListItem>
      <ListItem>
          <Button color="primary" variant="contained" fullWidth onClick={handleSubmit} >
              Continue
          </Button>
      </ListItem>
      <ListItem>
          <Button  variant="contained" fullWidth  onClick={()=>router.push('/shipping')}>
              Back
          </Button>
      </ListItem>
      
      </List>
      </form>
    </Layout>
  );
}

export default Payment;
