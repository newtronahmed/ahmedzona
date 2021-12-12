import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme)=>({
    navbar:{
        backgroundColor:'#131921',
        '& a':{
            color:'white',
            // marginRight:'10px',
           
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
    },
    stepper:{
        // [theme.breakpoints.down('sm')]:{
        //     flexDirection:"column",
        // }
        backgroundColor:'transparent'
    },
    searchInput:{
        // color:'white',
        // backgroundColor:'white',
        borderRadius:1.5,
        // border:'1px solid white',
        // width:'100%'
    },
    searchContainer:{
        display:'flex',
        justifyContent:'space-between'
    }
}))