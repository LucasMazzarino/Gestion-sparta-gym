import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {load_user, refresh, check_authenticated } from '../redux/actions/auth';

import { useEffect } from 'react';
import { connect } from 'react-redux';
import  Navegacion  from '../components/navegacion/Navbar';
import { Footer } from '../components/navegacion/Footer';

const Layout = (props) => {

  useEffect(() => {
    props.refresh()
    props.check_authenticated()
    props.load_user()
}, []);

  return(
    <div>
        <Navegacion/>
        <ToastContainer autoClose={5000} position="top-left" theme="colored"/>
        {props.children}
        <Footer/>
    </div>
  )
}

export default connect(null, {
  load_user,
  check_authenticated,
  refresh,
}) (Layout)