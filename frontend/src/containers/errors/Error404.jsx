import Layout from "../../hocs/Layout";
import Err404 from '../../imagenes/Err404.png';

const Error404 = () => {
    return(
        <Layout>
            <img className="Err404"
            src={Err404}
            alt='Error'></img>
        </Layout>
    )
}

export default Error404
