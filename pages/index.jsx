import  { Button, Card, CardActionArea, CardContent, CardMedia, Typography , Grid, CardActions, IconButton } from "@material-ui/core"
import Layout from "../components/layout"
// import {data} from '../utils/data'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import {useEffect, useState} from 'react'
// import Product from "../models/product"
import {useRouter} from 'next/router'
// import db from "../utils/db"
import { Carousel } from "react-responsive-carousel"
import NextLink from 'next/link'
import { useCartContext } from "../context/cartContext"
import axios from 'axios'
import {HiOutlineHeart , HiHeart} from 'react-icons/hi'
import { useUserContext } from "../context/userContext"
import DetailCard from "../components/card"
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
  // console.log(user)

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
    user && fetchFavourites()
    // console.log(favourites)
  },[])
  return (
    <Layout>
      <Carousel>
        <div>
          <img src="/images/shirt.jpg" alt="image" />
        </div>
        <div>
          <img src="/images/shirt.jpg" alt="imge"  />
        </div>
      </Carousel>
      <Typography variant="h1">
        Products
      </Typography>
      <Grid container spacing={3}>
        {
          products.map(each=>{
            return (
              <Grid item key={each.name} sm={6} lg={4} >
                <DetailCard data={each} user={user} favourites={favourites} setFavourites={setFavourites} />
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
    const response = await fetch(`${process.env.APP_URL}api/products`).then(res=>res.json())
    const {products} = response;
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