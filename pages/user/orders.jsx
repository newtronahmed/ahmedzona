import React, { useEffect, useState } from 'react'
import { List, ListItem, Table, TableContainer, TableCell, TableHead, TableRow, TableBody } from '@material-ui/core'
import { useUserContext } from '../../context/userContext'
import axios from 'axios'
import Layout from '../../components/layout'
function Orders() {
    const [orders, setorders] = useState([])
    const [userContext] = useUserContext()
    const fetchOrders = async function () {
        const { data } = await axios.get('/api/order', { headers: { authorization: `Bearer ${userContext.user.token}` } })
        setorders([...data.orders])
    }
    useEffect(() => {
        fetchOrders()
        // console.log()
    }, [])
    if (orders.length === 0) {
        return (
            <Layout>
                <div>No orders</div>
            </Layout>
        )
    }
    // console.log(orders)
    return (

        <Layout>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                            <TableCell>
                                Date
                            </TableCell>
                            <TableCell>
                                Total($)
                            </TableCell>
                            <TableCell>
                                Paid
                            </TableCell>
                            <TableCell>
                                Delivered
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            orders.map(each => (
                                <TableRow key={each._id}>
                                    <TableCell>
                                        {each._id}
                                    </TableCell>
                                    <TableCell>
                                        {each.createdAt}
                                    </TableCell>
                                    <TableCell>
                                        {each.total}
                                    </TableCell>
                                    <TableCell>
                                        {each.isPaid ? "paid" : "not paid"}
                                    </TableCell>
                                    <TableCell>
                                        {each.isDelivered ? "Delivered" : "Not delivered"}
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
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
