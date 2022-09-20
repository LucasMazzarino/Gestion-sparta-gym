import React from 'react';
import Layout from '../../hocs/Layout';

import { get_cursos } from '../../redux/actions/cursos';
import { useEffect } from 'react';
import { connect, Connect } from 'react-redux';

const Cursos = ({
    get_cursos,
}) => {

    useEffect(() => {
        get_cursos();
        window.scroll(0,0)
    },[]);

    return(
        <Layout>
        <section className='Cursos'>
            <h1>Cursos</h1>
            <li></li>
        </section>
        </Layout>
    )
}

export default  Cursos;