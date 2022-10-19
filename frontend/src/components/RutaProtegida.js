import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { connect } from 'react-redux';

const useUser=({
  user
}) => {

  if(user){
    return true
  }else{
    return false
  }
}


const RutaProtegida=(props) =>{

  const auth=useUser()

  return auth?<Outlet/>: <Navigate to="/"/>
}

const mapStateToProps = state => ({
  user: state.Auth.user
})

export default connect(mapStateToProps)(RutaProtegida)