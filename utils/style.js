import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles({
    navbar:{
        backgroundColor:'#131921',
        '& a':{
            color:'white',
            marginRight:'10px',
            fontSize:'1.4rem',
        }
    },
    main:{
        minHeight:'80vh',
    },
    section:{
        marginTop:'1.5rem',
        // marginBottom:'1.5rem',
    
    },
    grow:{ 
        flexGrow:1,
    },
    flex:{
        display:"flex",
    },
    footer:{
        textAlign:'center',
    },
    form:{
        // width:'500px',
        maxWidth:'500px',
        margin:'0 auto',

    },
    navbarButton:{
        color:'white',
        textTransform:'initial'
    }
})