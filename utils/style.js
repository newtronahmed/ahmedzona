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
    white:{
        color:'white',
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
        '&:focus':{
            border: '1px solid #131921'
        }
    },

    searchContainer:{
        display:'flex',
        justifyContent:'space-between'
    },
    loadingContainer:{
        height:'90vh',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    authLoginButton:{
        '& span':{
            margin:'0 5px',
        }
    },
    login_container:{
        // backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundImage:"url('/images/login.jpg')",
        backgroundRepeat:'none',
        width: '100%',
        height:'100%',
        position:'relative',
    },
    overlay:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        backgroundColor: '#131921',
        opacity:0.6,
    },
    cardImage:{
        objectFit: 'contain',
        height:'200px',
    },
    card:{
        boxShadow:'rgba(0,0,0,0.1) 0px 0px 0px 1px',
    },
    prodImage:{
        objectFit:"scale-down",
        objectPosition:"top",
    },
    emptyCartContainer:{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
    }
    
}))