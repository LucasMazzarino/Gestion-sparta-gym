import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { connect } from 'react-redux';

const RutasClientes=({
  token,
  staff
}) => {
  if(token !== null && !staff){
    return(
    <Outlet/>  
    )
  }else{
    return(
      <Navigate to="/"/>
    )
  }
}


const mapStateToProps = state => ({
  token: state.Auth.refresh,
  staff: state.Auth.staff
})

export default connect(mapStateToProps,{
  
}) (RutasClientes)