import React, { useContext } from 'react'
import AlertContext from '../context/alert/alertContext';
import Alert from '@mui/material/Alert';

const AlertMsg = () => {

  const alertContext = useContext(AlertContext);

  const { alert } = alertContext; 


  return(

    alert !== null && (
      <div>
        <Alert severity= {alert.type} >{alert.msg}</Alert>
      </div>
    )

  ); 
}

export default AlertMsg; 
