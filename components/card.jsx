import  { Button, Card, CardActionArea, CardContent, CardMedia, Typography , Grid, CardActions, IconButton } from "@material-ui/core"
import {HiOutlineHeart , HiHeart} from 'react-icons/hi'
import NextLink from 'next/link'
import {useRouter} from 'next/router'
import { useCartContext } from "../context/cartContext"
import axios from 'axios'

export  default function DetailCard ({data, user, favourites=[],setFavourites}) {
  const [cart,dispatch] = useCartContext()
  const router = useRouter()
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
    return (
        <Card>
          <NextLink href={`/product/${data.slug}`} passHref>
          <CardActionArea>
            <CardMedia component="img" image={data.image} title={data.name}></CardMedia>
            <CardContent>
              <Typography>
                {data.name} 
              </Typography>
            </CardContent>
          </CardActionArea>
          </NextLink>
          <CardActions>
            <Typography variant="h6">${data.price}</Typography>
            <Button type="submit" size="small" color="primary" onClick={()=>addToCart(data)} >Add to cart</Button>
            
            {user && <IconButton onClick={()=>handleFavourite(data._id)}> 
              {
                favourites.includes(data._id) ? <HiHeart style={{color:'red'}} /> : <HiOutlineHeart />
                
              }
            </IconButton>}
          </CardActions>
        </Card>
    )
}