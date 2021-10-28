import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({

  root: {
    margin: '10px !important',
    width: '25ch !important',
  },

  container: {
    padding: '20px'
  },


  textField: {
    margin: '15px !important',
    // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "#ffe135"
    // },
    // "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "#ffe135"
    // },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1A73E8"
    }
    
  },

  btn: {
    margin: '15px !important',
    width: '230px !important',
    background: '#16435A !important',
    color: '#fff !important'
  },

  searchBtn: {
    margin: '15px 10px 10px 10px !important',
    justifyContent: 'center',
    width: '230px !important',
    background: '#16435A !important',
    color: '#fff !important'
  },

  title: {

    flexGrow: '1', 
    letterSpacing: "1px !important",
    margin: '5px 10px 5px 40px !important'

  },

  greeting: {
    letterSpacing: '1px !important'
  },

  card: {
    paddingBottom: "5px !important",
    marginBottom: "5px !important"
  }, 

  media: {
    height: "150px",
    width: '100%',
  }


});


export default useStyles; 

