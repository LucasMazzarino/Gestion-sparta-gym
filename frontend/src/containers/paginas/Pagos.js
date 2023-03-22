import Layout from '../../hocs/Layout';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';

import { connect } from 'react-redux';


const Pagos = ({

}) => {

	return(
		<Layout>
		<section className='Pagos'>
			<h1>Estado de Cuenta</h1>
			<Container>
					<Row md={3}>
						
					</Row>          
			</Container>
		</section>
		</Layout>
)
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{

}) (Pagos)
