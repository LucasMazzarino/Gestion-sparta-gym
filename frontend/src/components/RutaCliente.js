import React from 'react';

import { useState } from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import { connect } from 'react-redux';

const RutasClientes=({
  staff,
  id
}) => {
  
  if(id && staff !== true ){
    console.log(staff ,"hola desde Rutas ciente")
    return(
      <Outlet/>
    )
  }else{
    return(
      <Navigate to="/"/>
    );
  }
}


const mapStateToProps = state => ({
  staff: state.Auth.staff,
  id: state.Auth.id,
})

export default connect(mapStateToProps,{
  
}) (RutasClientes)