import React from 'react'
import {Controller, useFormContext} from 'react-hook-form'
import { TextField } from '@material-ui/core'

export default function CustomTextField ({name,control,label,type,rules}) {
    return (
        <Controller
        name={name}
        control={control}
        defaultValue=""
        rules={rules}
        render={({
            field:{onChange,value},
            fieldState:{error},
            formState
        })=>(<TextField
            onChange={onChange}
            value={value}
            fullWidth
            label={label}
            autoFocus          
            variant="outlined"
            error={Boolean(error)}
            inputProps={{type}}
            helperText={Boolean(error) ? error.message : ''}
            />)}
        />
    )
}