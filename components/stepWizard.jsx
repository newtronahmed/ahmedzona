import React from 'react'
import {Stepper,Step, StepLabel} from '@material-ui/core'
import { useStyles } from '../utils/style'

function StepWizard({activeStep=0}) {
    const classes = useStyles ()
    return (
        <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel>
            {
                ['Login', 'Shipping Address' , 'Payment' , 'Place Order'].map(step=>(
                    <Step key={step}>
                        <StepLabel>{step}</StepLabel>
                    </Step>
                ))
            
            }
        </Stepper>
    )
}

export default StepWizard
