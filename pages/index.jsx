import { Button, Card, CardActionArea, CardContent, CardMedia, Typography , Grid, CardActions } from "@material-ui/core"
import Layout from "../components/layout"
// import {data} from '../utils/data'
import Product from "../models/product"
import {useRouter} from 'next/router'
import db from "../utils/db"
import NextLink from 'next/link'
import { useCartContext } from "../context/cartContext"
import axios from 'axios'
function HomePage({products}) {
  const router = useRouter()
  const [cart,dispatch] = useCartContext()
  const addToCart = async (item) =>{
    const {data} = await axios.get("/api/products/"+item._id)
    if(!data.countInStock > 0){
      window.alert("Sorry , product out of stock")
      return
    }
    router.push("/cart")
    const itemExists = cart.cartItems.find(x=>x._id === item._id)
    let quantity = itemExists ? ++itemExists.quantity : 1
    dispatch({type:"ADD_TO_CART", payload:{...item, quantity}})

  }
  return (
    <Layout>
      <Typography variant="h1">
        Product
      </Typography>
      <Grid container spacing={3}>
        {
          products.map(each=>{
            return (
              <Grid item key={each.name} md={4} >
                <Card>
                  <NextLink href={`/product/${each.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia component="img" image={each.image} title={each.name}></CardMedia>
                    <CardContent>
                      <Typography>
                        ${each.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography variant="h6">${each.price}</Typography>
                    <Button size="small" color="primary" onClick={()=>addToCart(each)} >Add to cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            )
          })
        }
      </Grid>

    </Layout>
  )
}

export default HomePage
export async function getServerSideProps (){
  await db.connect()
  const products = await Product.find({}).lean()
  return {
    props: {
      products: products.map(db.convertDocToObject)
    }
  }
}