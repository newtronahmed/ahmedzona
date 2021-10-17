import { Button, Card, CardActionArea, CardContent, CardMedia, Typography , Grid, CardActions, IconButton } from "@material-ui/core"
import Layout from "../components/layout"
// import {data} from '../utils/data'
import {useEffect, useState} from 'react'
import Product from "../models/product"
import {useRouter} from 'next/router'
// import db from "../utils/db"
import NextLink from 'next/link'
import { useCartContext } from "../context/cartContext"
import axios from 'axios'
import {HiOutlineHeart , HiHeart} from 'react-icons/hi'
import { useUserContext } from "../context/userContext"
function HomePage({products}) {
  const router = useRouter()
  const [cart,dispatch] = useCartContext()
  const [{user}] = useUserContext()
  const [favourites,setFavourites] = useState([])
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
  // console.log(favourites)
  const handleFavourite = async (id) =>{
    if(!favourites.includes(id) ){
      // let filtered =favourites.filter(each=>each._id === id)
     let data = await fetch('/api/users/favourite/'+id,{
        method:"POST",
        headers:{
          authorization: `Bearer ${user.token}`
        }
      }).then(res=>res.json())

      setFavourites([...data.favourites])
    }else {
      let data= await fetch('/api/users/favourite/'+id,{
        method:"DELETE",
        headers:{
          authorization: `Bearer ${user.token}`
        }
      }).then(res=>res.json())
      // console.log(data)
      setFavourites([...data.favourites])
    }
  }
  useEffect(()=>{
    async function fetchFavourites(){

      try {
        let data= await fetch('/api/users/favourite',{
          headers:{
            authorization: `Bearer ${user.token}`
          }
        }).then(res=>res.json())
        // console.log(data)
        setFavourites(data.favourites.map(each=>each._id))
      } catch (error) {
        console.log(error)
      }
    }
    fetchFavourites()
    // console.log(favourites)
  },[])
  return (
    <Layout>
      <Typography variant="h1">
        Products
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
                    <Button type="submit" size="small" color="primary" onClick={()=>addToCart(each)} >Add to cart</Button>
                    
                    <IconButton onClick={()=>handleFavourite(each._id)}> 
                      {
                        favourites.includes(each._id) ? <HiHeart style={{color:'red'}} /> : <HiOutlineHeart />
                        
                      }
                    </IconButton>
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

export async function getServerSideProps (){
  // await db.connect()
  // console.log(process.env.APP_URL)
  try {
    const products = await fetch(`${process.env.APP_URL}api/products`,{headers:{"User-Agent":"Chrome"}}).then(res=>res.json())
    // const favourites = 
    // console.log(data)
    return {
      props: {
        products
      }
    }
  } catch (error) {
    console.log(error)
    return {
      notFound:true
    }
  }
}
export default HomePage