import React from 'react';

import {Navigate, Outlet} from 'react-router-dom'
import { connect } from 'react-redux';

const RutasAdmin=({
  staff
}) => {
  if(staff == true){
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
  staff: state.Auth.staff
})

export default connect(mapStateToProps,{
  
}) (RutasAdmin)