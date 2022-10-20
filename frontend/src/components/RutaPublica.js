import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { connect } from 'react-redux';

const RutasPublicas=({
  token
}) => {
  const auth = token
  return(
    auth? <Navigate to="/"/> :  <Outlet/> 
  )
}


const mapStateToProps = state => ({
  token: state.Auth.refresh
})

export default connect(mapStateToProps,{
  
}) (RutasPublicas)