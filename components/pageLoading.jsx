import React from 'react'
import {CircularProgress} from '@material-ui/core'
import {useStyles} from '../utils/style'
export default function PageLoading() {
    const classes = useStyles()
    return (
        <div className={classes.loadingContainer}>
            <CircularProgress color="primary" thickness={12} size={64}  />
        </div>
    )
}
