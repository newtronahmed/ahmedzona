import React ,{useState} from 'react'
import {InputBase , IconButton} from '@material-ui/core'
import { useStyles } from '../utils/style';
import {FaSearch} from 'react-icons/fa'
import NextLink from 'next/link'
import {useRouter} from 'next/router'
function SearchBox({handleChange,value}) {
    const [keyword,setKeyword] = useState('')
    const router = useRouter()
  const classes = useStyles();
    const handleSearch = () =>{
        setKeyword('')
        console.log(keyword)
        router.push(`/search?keyword=${keyword}`)
    }
    return (
        <>
        <InputBase
            name="keyword"
            placeholder="Search Product"
            className={classes.searchInput}
            value={value}
            onChange={handleChange}
            autoFocus={true}
            >
            </InputBase>
            <IconButton >
                <FaSearch />
            </IconButton>
            </>
    )
}

export default SearchBox
