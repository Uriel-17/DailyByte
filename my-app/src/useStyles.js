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
    background: '#1A73E8 !important',
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
  }


});


export default useStyles; 




// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: '1px',
//     width: '25ch',
//   },

//   btn: {
//     margin: '15px',
//     width: '230px',
//     background: '#1A73E8',
//     color: '#fff'
//   },

//   drawer: {
//     width: 240,
//   },

//   drawerPaper: {
//     width: 240
//   },

//   active: {
//     background: '#f4f4f4'
//   }

// }));
