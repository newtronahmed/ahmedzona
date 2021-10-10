import React from 'react'
import {Stepper,Step, StepLabel} from '@material-ui/core'
function StepWizard({activeStep=0}) {
    return (
        <Stepper activeStep={activeStep}>
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
