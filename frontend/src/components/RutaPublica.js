import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { connect } from 'react-redux';

const RutasPublicas=({
  user
}) => {
  const auth = user
  return(
    auth? <Navigate to="/"/> :  <Outlet/> 
  )
}


const mapStateToProps = state => ({
  user: state.Auth.user
})

export default connect(mapStateToProps,{
  
}) (RutasPublicas)