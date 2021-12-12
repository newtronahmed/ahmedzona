import React,{useEffect ,useState} from 'react'
import {List, ListItem} from '@material-ui/core'
import { useUserContext } from '../../context/userContext'
import axios from 'axios'
import Layout from '../../components/layout'
function Orders() {
    const [orders, setorders] = useState([])
    const [userContext] = useUserContext()
    const fetchOrders = async function (){
        const {data}= await axios.get('/api/order',{headers:{authorization: `Bearer ${userContext.user.token}`}})
        setorders([...data.orders])
    }
    useEffect(()=>{
       fetchOrders()
        // console.log()
    },[])
    if(orders.length ===0){
        return <div>No orders</div>
    }
    return (
        
        <Layout>
            
                <List>
                    {
                    orders.map(each => {
                        return (<ListItem>
                            {each._id}
                        </ListItem>)
                    })
                    }
                </List>
            
        </Layout>
    )
}


export default Orders
// export async function getServerSideProps (){
//     try{

//         const response = await fetch(`${process.env.APP_URL}api/order`,{header:{authorization:`Bearer ${userContext.user.token}`}}).then(res=>res.json())
//        const {orders} = response;
//        return{
//            props:{
//                orders
//            }
//        }
//     }catch(error){
//         console.log(error)
//         return {
//           notFound:true
//         }
//         }


// }
