import React from "react";
import NextLink from "next/link";
import Image from "next/image";
// import { data } from "../../utils/data";
import { useForm } from 'react-hook-form'
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Link, Typography, Grid, List, ListItem, Card, Button, CircularProgress } from "@material-ui/core";
// import Product from "../../models/product";
// import db from "../../utils/db";
import axios from "axios";
import { useCartContext } from "../../context/cartContext";
import CustomTextField from "../../components/customTextField";
import { useSnackbar } from 'notistack'
import { useUserContext } from "../../context/userContext";
import { useStyles } from "../../utils/style";

function ProductScreen({ product, reviews }) {
  const [cartContext, dispatch] = useCartContext()
  const [userContext] = useUserContext()
  // let [reviews,setReviews] = useState(function(){return reviews || []})
  const router = useRouter()
  const classes = useStyles();
  const { control, handleSubmit, reset } = useForm()
  const { closeSnackbar, enqueueSnackbar } = useSnackbar()
  if (!product) {
    return <div>No product</div>
  }
  // console.log(product)

  const addToCartHandler = async () => {
    dispatch({ type: "CHANGE_LOADING_STATE" })
    try {
      const { data } = await axios.get("/api/products/" + product._id)
      // console.log(data)
      dispatch({ type: "CHANGE_LOADING_STATE" })
      if (!data.product.countInStock > 0) {
        // window.alert("Sorry this product is out of stock")
        enqueueSnackbar("Sorry this product is out of stock",{variant: "warning"})
        return;
      }
      let itemExists = cartContext.cartItems.find(x => x._id === product._id)
      let quantity = itemExists ? itemExists.quantity + 1 : 1

      dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity } })
      enqueueSnackbar("Added to cart successfully",{variant:"success"})
      router.push("/cart")
    } catch (e) {
      console.log(e)
      dispatch({ type: "CHANGE_LOADING_STATE" })
    }


  }
  const addReview = async (credentials) => {
    // console.log(credentials)
    // reset()
    closeSnackbar()
    try {
      const { data } = await axios.post('/api/reviews', { product: product._id, review: credentials.review }, {
        headers: {
          authorization: `Bearer ${userContext.user.token}`
        }
      })
      // setReviews([...data.updatedReviews])
      enqueueSnackbar(data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response?.data.message || error.message, { variant: 'error' })
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
              className={classes.prodImage}
            ></Image>
            <div>
              <h1>Reviews</h1>
              <List>
                {
                  reviews.map(el => {
                    return (<ListItem key={el.message}><Typography>{`${el.message} by ${el.owner} at ${el.createdAt}`}</Typography></ListItem>)
                  })
                }
              </List>
              {userContext.user ? <form>
                <List>
                  <ListItem>
                    <CustomTextField name="review" type="text" rules={{ required: true }} control={control} label="Add Review" />
                  </ListItem>
                  <ListItem>
                    <Button type="submit" onClick={handleSubmit(addReview)}>Submit</Button>
                  </ListItem>
                </List>
              </form> : <div> Login to add a review <NextLink href="/login" passHref><Link>Login</Link></NextLink> </div>}
            </div>
          </Grid>
          <Grid item md={3} >
            <List>
              <ListItem>
                <Typography >Category : {product.category?.name ?? 'null'}</Typography>
              </ListItem>
              <ListItem>
                <Typography>Brand : {product.brand?.name ?? 'null'}</Typography>
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
                <Button fullWidth color="primary" disabled={cartContext?.loading} variant="contained" onClick={addToCartHandler} style={{ position: "relative" }} >
                  {cartContext?.loading ? <CircularProgress size={24} style={{ color: "white" }} /> : "ADD TO CART"}
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

export async function getServerSideProps(context) {
  // db.connect()
  const { params: { slug } } = context
  // const product = await Product.findOne({slug}).lean()
  const res = await fetch(`${process.env.APP_URL}api/products/single/${slug}`)
  const { product, reviews } = await res.json()
  return {
    props: {
      product,
      reviews
    }
  }
}
