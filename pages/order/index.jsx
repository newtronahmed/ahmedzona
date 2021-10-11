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
import React,{useState,useEffect} from "react";
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
import StepWizard from "../../components/stepWizard";

function Order() {
  const [cart, dispatch] = useCartContext();
  const router = useRouter()
  const [loading,setLoading] = useState(false)
  const [userContext,userDispatch] = useUserContext()
  const { shippingInfo, paymentMethod } = cart;
  const {enqueueSnackbar, closeSnackbar} = useSnackbar()
  const classes = useStyles();
  useEffect(() => {
    if(!paymentMethod){
        router.push('/payment')
    }
  }, [])
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = cart.cartItems.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0
  );
  const shippingPrice = 15;
  const tax = round2(itemsPrice * 0.1);
  const total = round2(itemsPrice + shippingPrice + tax);

  const handleOrder = async () =>{
    closeSnackbar()
    setLoading(true)
    // console.log(userContext.user.token)
    try {
        const {data} = await axios.post('/api/order/',{
            cartItems:cart.cartItems,
            shippingInfo,
            itemsPrice,
            paymentMethod,
            tax,
            shippingPrice,
            total
        },{
            headers:{
                authorization:`Bearer ${userContext.user.token}`
            }
        })
        setLoading(false)
        console.log(data)
        dispatch({type:"RESET"})
        Cookies.remove("cartItems")
        router.push("/order/"+data.order._id)
    } catch (error) {
        enqueueSnackbar(getError(error),{variant:"error"})
        console.log(getError(error))
        setLoading(false)
    }
  }

  return (
    <Layout title="Your cart">
      <StepWizard activeStep={3} />
      <Typography variant="h1">Shopping Cart</Typography>
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
                  {cart.cartItems.map((cartItem) => {
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
                      {cart.cartItems.reduce(
                        (acc, ind) => acc + ind.quantity,
                        0
                      )}
                      )
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      {"$" +
                        cart.cartItems.reduce(
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
              <ListItem>
              <Button fullWidth color="primary" disabled={loading} variant="contained" onClick={handleOrder} style={{position:"relative"}} >
                  {loading ? <CircularProgress size={24} style={{color:"white"}} /> : "Place Order"}
              </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Order), { ssr: false });
