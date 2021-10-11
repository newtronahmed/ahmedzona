import {
    Grid,
    Link,
    TableBody,
    TableCell,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    Typography,
    Button,
    Card,
    List,
    ListItem,
    Divider,
    CircularProgress
  } from "@material-ui/core";
  import Layout from "../../components/layout";
  import NextLink from "next/link";
  import React,{useState,useEffect , useReducer} from "react";
  import dynamic from "next/dynamic";
  import Image from "next/image";
  import { useCartContext } from "../../context/cartContext";
  import axios from "axios";
  import { useRouter } from "next/router";
  import { useStyles } from "../../utils/style";
  import { useSnackbar } from "notistack";
  import { getError } from "../../utils/functions";
  import { useUserContext } from "../../context/userContext";
  import Cookies from "js-cookie";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
  
  const reducer = (state,action) =>{
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {
                ...state,order:action.payload, loading:false,
            }
        case "FETCH_REQUEST":
            return {
                ...state,loading:true,
            }
        case "FETCH_FAILURE":
            return {
                ...state,loading:false,error:action.payload
            }
        case "PAY_REQUEST":
            return {
                ...state,loadingPay:true
            }
        case "PAY_SUCCESS":
            return {
                ...state,loadingPay:false, successPay:true
            }
        case "PAY_FAIL":
            return {
                ...state,loadingPay:false, successPay:false,
            }
        case "PAY_RESET":
            return {
                ...state,loadingPay:false, successPay:false
            }
        default:
            state;
    }
  }
  function OrderDetails({params}) {
    // const [cart] = useCartContext();
    const router = useRouter()
    // const [loading,setLoading] = useState(false)
    const [{loading, error, order , successPay},dispatch] = useReducer(reducer,{loading:true, error:'', order:{} , successPay:false})
    const [userContext] = useUserContext()
    //paypal gives us a reducer called use Paypal reducer
    const [{isPending},paypalDispatch] = usePayPalScriptReducer()
    
    // const { shippingInfo, paymentMethod } = cart;
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const orderId = params.id
    const classes = useStyles();
    useEffect(() => {
      if(!userContext.user){
          router.push('/payment')
      }
      const fetchOrder = async () =>{
          dispatch({type:"FETCH_REQUEST"})
        try {
            const {data} = await axios.get(`/api/order/${orderId}`,{
                headers:{
                    authorization:`Bearer ${userContext.user.token}`
                }
            })
            dispatch({type:"FETCH_SUCCESS",payload:data.order})
            console.log(data)
        } catch (error) {
            console.log(error)
            dispatch({type:"FETCH_FAILURE",payload:getError(error)})
            // enqueueSnackbar(getError(error))
        }  
        console.log("order",order)

      }
//fetch order when order is not defined or orderId is not equal to current orderid in the query
      if(!order._id || successPay || (order._id && order._id !== params.id)){
          fetchOrder()
          if(successPay){
            dispatch({type:"PAY_RESET"})
          }
      }else{
        //load paypal from my api
        try{

          let loadPaypalScript = async () =>{
            const {data:clientId} = await axios.get('/api/keys/paypal',{
              headers:{
                authorization:`Bearer ${userContext.user.token}`
              }
            })
          }
          //dispatch paypal action to set client id
          paypalDispatch({type:"resetOptions",value:{
            "client-id":clientId
          }})
  
          //set paypaal loading staqtus to true
          paypalDispatch({type:"setLoadingStatus",value:"pending"})
        }catch(err){
          console.log(error)
        }
      }

    }, [order,successPay])

    const {cartItems,
        shippingInfo,
        itemsPrice,
        paymentMethod,
        tax,
        shippingPrice,
        total,isDelivered, isPaid, paidAt,deliveredAt} = order
//create order function has data and action as parameters
    const createOrder = (data, action) =>{
      return action.order.create({
        purchase_units:[
          {
            amount:{value: total}
          }
        ]
      }).then(orderID=> orderID)
    }
//onApprove of order , change status in the database

    const onApprove = (data,action) => {
      return action.order.capture().then(async function (details){
        try{
          dispatch({type:"PAY_REQUEST"})
          const {data} = await axios.put(`/api/order/${params.id}/pay`, details , {
            headers:{
              authorization:`Bearer ${userContext.user.token}`
            }
          })
          dispatch({type:"PAY_SUCCESS" , payload:data})
          enqueueSnackbar("Order Payment successful",{variant:"success"})
        }catch(err){
          dispatch({type:"PAY_FAIL"})
          enqueueSnackbar(getError(err),{variant:"error"})
        }
      })
    }

    const onError = (err) =>{
      enqueueSnackbar(getError(err),{variant:"error"})
    }

    // const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
    // const itemsPrice = cartItems.reduce(
    //   (acc, cur) => acc + cur.quantity * cur.price,
    //   0
    // );
    // const shippingPrice = 15;
    // const tax = round2(itemsPrice * 0.1);
    // const total = round2(itemsPrice + shippingPrice + tax);
  
    // const handleOrder = async () =>{
    //   closeSnackbar()
    // //   setLoading(true)
    //   // console.log(userContext.user.token)
    //   try {
    //       const {data} = await axios.post('/api/order',{
    //           cartItems:cart.cartItems,
    //           shippingInfo,
    //           itemsPrice,
    //           paymentMethod,
    //           tax,
    //           shippingPrice,
    //           total
    //       },{
    //           headers:{
    //               authorization:`Bearer ${userContext.user.token}`
    //           }
    //       })
    //     //   setLoading(false)
    //       console.log(data)
    //       dispatch({type:"RESET"})
    //       Cookies.remove("cartItems")
    //       router.push("/order/"+data._id)
    //   } catch (error) {
    //       enqueueSnackbar(getError(error),{variant:"error"})
    //       console.log(getError(error))
    //     //   setLoading(false)
    //   }
    // }
  
    return (
      <Layout title="Your cart">
        <Typography variant="h1">Order {orderId}</Typography>
        {
            loading ? (
                <CircularProgress />
            ): error ? (<div>There was an error</div>) :(

        <Grid container spacing={2}>
          <Grid item md={9} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">Shipping Address</Typography>
                </ListItem>
                <ListItem>
                  <Typography>
                    {` ${shippingInfo.fullname} , ${shippingInfo.address}, ${shippingInfo.postalcode} , ${shippingInfo.city} , ${shippingInfo.country}`}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography >Status: {isDelivered ? "Delivered at "+ deliveredAt  : "Not devlivered"}</Typography>
                </ListItem>

              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography variant="h2">Payment Method</Typography>
                </ListItem>
                <ListItem>
                  <Typography>{paymentMethod}</Typography>
                </ListItem>
                <ListItem>
                  <Typography >Status: {isPaid ? "You paid at" + paidAt : "No payment payment made"}</Typography>
                </ListItem>
              </List>
            </Card>
            <Card className={classes.section}>
              <List>
                <ListItem>
                  <Typography variant="h1">Order Items</Typography>
                </ListItem>
              </List>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((cartItem) => {
                      return (
                        <TableRow key={cartItem.name}>
                          <TableCell>
                            <NextLink href={`/products/${cartItem._id}`} passHref>
                              <Link>
                                <Image
                                  src={cartItem.image}
                                  width={50}
                                  height={50}
                                  // layout="fill"
                                  alt={cartItem.name}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell>
                            <Typography>{cartItem.name}</Typography>
                          </TableCell>
                          <TableCell align="right">{cartItem.quantity}</TableCell>
                          <TableCell align="right">
                            <Typography>${cartItem.price}</Typography>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h1">Order Summary</Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>
                        Sub Total (
                        {cartItems.reduce(
                          (acc, ind) => acc + ind.quantity,
                          0
                        )}
                        )
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">
                        {"$" +
                          cartItems.reduce(
                            (acc, ind) => acc + ind.quantity * ind.price,
                            0
                          )}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Tax:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${tax}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Shipping:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography align="right">${shippingPrice}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      <Typography>Total:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <strong>
                        <Typography align="right">${total}</Typography>
                      </strong>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Divider />
                </ListItem>
                {
                  !isPaid && (
                    <ListItem>
                     { isPending ? <CircularProgress /> : <div style={{width:'100%'}}><PayPalButtons onApprove={onApprove} createOrder={createOrder} onError={onError} /></div> }
                    </ListItem>
                  )
                }
                {/* <ListItem>
                <Button fullWidth color="primary" disabled={loading} variant="contained" onClick={handleOrder} style={{position:"relative"}} >
                    {loading ? <CircularProgress size={24} style={{color:"white"}} /> : "Place Order"}
                </Button>
                </ListItem> */}
              </List>
            </Card>
          </Grid>
        </Grid>
            )
        }
      </Layout>
    );
  }
  export async function getServerSideProps ({params}){
    return {
        props:{
            params
        }
    }
  }
  
  export default dynamic(() => Promise.resolve(OrderDetails), { ssr: false });
  