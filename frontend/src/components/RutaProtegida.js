import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { connect } from 'react-redux';

const RutasProtegidas=({
  user
}) => {
  const auth = user
  return(
    auth? <Outlet/> : <Navigate to="/"/>
  )
}


const mapStateToProps = state => ({
  user: state.Auth.user
})

export default connect(mapStateToProps,{
  
}) (RutasProtegidas)