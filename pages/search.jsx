import Layout from "../components/layout";
import React, { useState, useEffect } from 'react'
import { Grid, InputLabel, List, MenuItem, Select, Typography, ListItem, CircularProgress, Paper } from "@material-ui/core";
import axios from 'axios'
import DetailCard from "../components/card";
// import {useRouter} from 'next/router'
import { useStyles } from "../utils/style";
import SearchBox from "../components/searchBox";
import { FaSort } from "react-icons/fa";
export default function Search({ categories, brands }) {
    // console.log(categories)
    // console.log({ categories, brands })

    // const [category,setCategory] = useState('all')
    // const [brand,setBrand] = useState('all')
    const [products, setProducts] = useState([])
    // const [params,setParams] = useState(function(){
    //     let init = {category:'all', brand:'all' , sort:'-createdAt',page:'1' , }
    //     if(router.query.keyword){
    //         init.keyword = router.query.keyword
    //     }
    // })
    const classes = useStyles()
    const [params, setParams] = useState({ category: 'all', brand: 'all', sort: '-createdAt', page: '1', keyword: '' })
    // const [pagination,setPagination] = useState({})
    const [loading, setLoading] = useState(false)
    async function fetchParams() {
        // console.log('fetch params')
        setLoading(true)
        try {
            const res = await axios.get(`/api/products`, { params })
            const { products: resultingProducts, ...rest } = res.data
            // console.log({resultingProducts, total})
            setProducts(resultingProducts)
            // setPagination(rest)
            setLoading(false)
            // setPagination({...rest})
            // console.log(params)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }

    }
    function emptyComponent() {
        return (
            <p>No products found</p>
        )
    }
    function displayProducts(data) {
        // console.log({data})
        return data.map(each => {
            return (<Grid key={each.name} item xs={12} md={3}>
                <DetailCard data={each} user={false} />
            </Grid>)
        })
    }
    function handleChange(e) {
        e.preventDefault()
        // console.log(e.target.value)
        setParams({ ...params, [e.target.name]: e.target.value })
        // if value is all no request should be made
    }
    useEffect(() => {
        fetchParams()
    }, [params])
    const { category, brand, sort, keyword } = params;
    return (
        <Layout title="Search">
            <Grid container>
                <Grid item xs={12} md={3}>
                    <List>
                        <ListItem>
                            <div>
                                <InputLabel id="category-label">Categories</InputLabel>
                                <Select labelId="category-label" id="select-category" name="category" value={category} onChange={handleChange} >
                                    <MenuItem value="all">all</MenuItem>
                                    {
                                        categories.map(category => (
                                            <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </div>
                        </ListItem>
                        <ListItem>
                            <div>
                                <InputLabel id="menu-label">Brands</InputLabel>
                                <Select labelId="menu-label" id="select-category" name="brand" value={brand} onChange={handleChange} >
                                    <MenuItem value="all">all</MenuItem>
                                    {
                                        brands.map(brand => (
                                            <MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </div>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={9}>
                    <div className={classes.searchContainer}>
                        <div>
                            <SearchBox handleChange={handleChange} value={keyword} />
                        </div>
                        <div>
                            <Select IconComponent={() => <FaSort />} labelId="Sort" id="select-sort" name="sort" onChange={handleChange} value={sort} >
                                {/* <MenuItem value="" */}
                                <MenuItem value="-createdAt"> Recent</MenuItem>
                                <MenuItem value="-price"> Price: High to low</MenuItem>
                                <MenuItem value="price"> Price: low to high</MenuItem>
                                <MenuItem value="numRatings" >Ratings:low to high </MenuItem>
                                <MenuItem value="-numRatings" >Ratings:High to low </MenuItem>
                            </Select>
                        </div>
                    </div>
                    <Grid container spacing={3}>
                        {
                            loading ? <Paper className={classes.loadingContainer}> <CircularProgress /> </Paper> : (products.length > 0) ? displayProducts(products) : emptyComponent()
                        }
                    </Grid>
                    {/* <DataGrid page={1} pageSize={2} pagination /> */}


                </Grid>
            </Grid>
        </Layout>
    )
}
export async function getServerSideProps() {
    const categories = await fetch(`${process.env.APP_URL}api/products/categories`).then(res => res.json())
    // const products = await fetch(`${process.env.APP_URL}api/products`).then(res=>res.json())
    const brands = await fetch(`${process.env.APP_URL}api/products/brands`).then(res => res.json())

    return {
        props: {
            categories,
            brands,

        }
    }
}

