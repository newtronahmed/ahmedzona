import React from "react";
import NextLink from "next/link";
import Image from "next/image";
// import { data } from "../../utils/data";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Link, Typography, Grid, List , ListItem , Card , Button , CircularProgress } from "@material-ui/core";
import { useStyles } from "../../utils/style";
import Product from "../../models/product";
import db from "../../utils/db";
import axios from "axios";
import { useCartContext } from "../../context/cartContext";
function ProductScreen({product}) {
  const [state,dispatch] = useCartContext()
  const router = useRouter()
  const classes = useStyles();
  if (!product) {
    return <div>No product</div>
  }
  const addToCartHandler = async() =>{
    dispatch({type:"CHANGE_LOADING_STATE"})
    try{
      const {data} = await axios.get("/api/products/"+ product._id)
      dispatch({type:"CHANGE_LOADING_STATE"})
      if(!data.countInStock > 0) {
        window.alert("Sorry this product is out of stock")
        return ;
      }
      let itemExists = state.cartItems.find(x=>x._id === product._id)
    let quantity = itemExists ? itemExists.quantity + 1 : 1

      dispatch({type:"ADD_TO_CART", payload:{...product, quantity}})
      router.push("/cart")
    }catch(e){
      console.log(e)
      dispatch({type:"CHANGE_LOADING_STATE"})
    }
   
    

  }

  return (
    <Layout title={product.name} description={product.description} >
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>Go back</Link>
        </NextLink>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <Image
              src={product.image}
              width="640"
              height="640"
              layout="responsive"
            ></Image>
          </Grid>
          <Grid item md={3} >
              <List>
                  <ListItem>
                      <Typography variant="h1">Category :{product.category}</Typography>
                  </ListItem>
                  <ListItem>
                      <Typography>Brand : {product.brand}</Typography>
                  </ListItem>
                  <ListItem>
                      <Typography>Rating : {product.numRating} stars ({product.numReviews} reviews) </Typography>
                  </ListItem>
                  <ListItem>
                      <Typography>Description : {product.description}</Typography>
                  </ListItem>

              </List>
          </Grid>
          <Grid item md={3} xs={12} >
              <Card >
              <List>
                  <ListItem>
                      <Grid container >
                          <Grid item xs={6} >
                              <Typography>Price </Typography>
                          </Grid>
                          <Grid item xs={6}>
                            {product.price}
                          </Grid>
                      </Grid>
                  </ListItem>
                  <ListItem >
                      <Grid container  >
                          <Grid item xs={6} >
                              <Typography>Status </Typography>
                          </Grid>
                          <Grid item xs={6}>
                           <Typography> {` ${product.countInStock < 0 ? "OUT OF STOCK" : "IN STOCK"} `}</Typography>
                          </Grid>
                      </Grid>
                  </ListItem>
              </List>
              <ListItem>
              <Button fullWidth color="primary" disabled={state?.loading} variant="contained" onClick={addToCartHandler} style={{position:"relative"}} >
                  {state?.loading ? <CircularProgress size={24} style={{color:"white"}} /> : "ADD TO CART"}
              </Button>
              

              </ListItem>
              </Card>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default ProductScreen;

export async function getServerSideProps(context){
  db.connect()
  const {params:{slug}} = context
  const product = await Product.findOne({slug}).lean()
  return{
    props:{
      product: db.convertDocToObject(product)
    }
  }
}
