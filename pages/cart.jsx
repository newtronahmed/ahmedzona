import { Grid, Link, MenuItem, Select, TableBody, TableCell, TableContainer, Table, TableHead, TableRow, Typography , Button , Card , List, ListItem, Divider} from '@material-ui/core'
import Layout from '../components/layout'
import NextLink from 'next/link'
import React from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useCartContext } from '../context/cartContext'
import axios from 'axios'
import {useRouter} from 'next/router'

function Cart() {
    const [cart,dispatch] = useCartContext()
    const router = useRouter()
    // console.log(cart)
    const updateQuantity =  async (item,quantity) =>{
        const {data} = await axios.get("/api/products/"+item._id)
        // console.log(quantity)
        if(!data.countInStock > 0){
            window.alert("Sorry ,  product out of stock")
            return
        }       
        dispatch({type:"ADD_TO_CART",payload:{...item,quantity}})
    }
    const removeFromCart = async(id) =>{
        dispatch({type:"REMOVE_FROM_CART" , payload:id})
    }
    const checkoutHandler = () => {
        router.push("/shipping")
    }
    return (
        <Layout title="Your cart">
            <Typography variant="h1">Shopping Cart</Typography>
            {
                cart.cartItems.length === 0 ? (
                    <div>
                        Cart is Empty
                        <NextLink href="/" passHref>
                            <Link>
                                <Typography>Start shopping</Typography>
                            </Link>
                        </NextLink>
                    </div>
                ): (
                    <Grid container>
                        <Grid item md={9} xs={12}>
                            <TableContainer>
                                <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Image
                                        </TableCell>
                                        <TableCell>
                                            Name
                                        </TableCell>
                                        <TableCell align="right">
                                            Quantity
                                        </TableCell>
                                        <TableCell align="right">
                                            Price
                                        </TableCell>
                                        <TableCell align="right">
                                            Action
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        cart.cartItems.map(cartItem=>{
                                            return (
                                                <TableRow key={cartItem.name}>
                                                    <TableCell>
                                                        <NextLink href={`/products/${cartItem._id}`} passHref>
                                                            <Link>
                                                                <Image src={cartItem.image}
                                                                width={50}
                                                                height={50}
                                                                // layout="fill"
                                                                alt={cartItem.name}
                                                                >
                                                                    
                                                                </Image>
                                                            </Link>
                                                        </NextLink>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography>
                                                            {cartItem.name}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Select value={cartItem.quantity} onClick={(e)=>updateQuantity(cartItem,e.target.value)}>
                                                            {
                                                                
                                                                [...Array(Number(cartItem.countInStock)).keys()].map(x=>(
                                                                    <MenuItem key={x+1} value={x+1} >
                                                                        {x+1}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography>
                                                            ${cartItem.price}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Button variant="contained" color="secondary" onClick={()=>removeFromCart(cartItem._id)}>
                                                            x
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                    }
                                </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                        <Grid item md={3 } xs={12}>
                            <Card>
                                <List>
                                    <ListItem>
                                       <Grid container spacing={3}>
                                            <Grid item>
                                                <Typography>
                                                    Sub Total ({cart.cartItems.reduce((acc,ind)=>acc + ind.quantity, 0)})
                                                </Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography >
                                                    {
                                                        "$" + cart.cartItems.reduce((acc,ind)=> acc + (ind.quantity * ind.price) , 0)
                                                    }
                                                </Typography>
                                            </Grid>
                                       </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Divider />
                                    </ListItem>
                                    <ListItem>
                                    
                                    <Button fullWidth variant="contained" color="primary" onClick={checkoutHandler} >
                                            Checkout
                                       </Button>
                                    </ListItem>
                                    <Typography align="center">or</Typography>
                                    <ListItem>
                                    <Button fullWidth>
                                                <NextLink href="/">
                                                    continue shopping
                                                </NextLink>
                                    </Button>
                                    </ListItem>
                                    
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                )
            }
        </Layout>
    )
}

export default dynamic(()=>Promise.resolve(Cart), {ssr:false})
