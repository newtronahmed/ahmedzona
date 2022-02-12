import React from 'react'
import { CircularProgress } from '@material-ui/core'
import { useStyles } from '../utils/style'
import Layout from './layout'
export default function PageLoading({children}) {
    const classes = useStyles()
    return (
        <div className='pageLoadContainer'>

            {/* <Children /> */}
            {children}
            <div className='loadingContainer'>
                <CircularProgress color="primary" thickness={6} size={64} />
            </div>
        </div>
    )
}
