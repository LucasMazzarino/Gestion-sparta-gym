import Layout from '../../hocs/Layout';

import Container from 'react-bootstrap/Container'

import { connect } from 'react-redux';
import { useEffect } from 'react';
import { get_ingresos } from '../../redux/actions/ingresos';

import {
    Chart as ChartJS,
    CategoryScale,
    Title,
    Legend,
    BarElement,
    Tooltip,
    Filler,
    LinearScale
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    Title,
    Legend,
    BarElement,
    Tooltip,
    Filler,
    LinearScale
)

const Estadisticas = ({
    get_ingresos,
    ingresos,
}) => {

    useEffect(() => {
        get_ingresos()

    },[])
        

    var data = {
        labels: ingresos?.map((ing) => ing.nombre),
        datasets: [{
          label: 'grafic',
          data: ingresos?.map((ing) =>ing.ingresos),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Grafico general de Ganancias',
            },
        },
    }


    const mostrarIngresos = () => {
        return(
            ingresos &&
            ingresos !== null &&
            ingresos !== undefined &&
            ingresos.length !== 0 &&
            ingresos.map((ingreso) => {
                return(
                    <Container className='listIngresos' key={ingreso.id}>
                        <div key={ingreso.id}>
                        <Bar datasetIdKey={ingreso.id}
                            data={{
                                labels: ingreso?.ingresos_mensuales.map((ing)=> `${ing.month + '/' + ing.year}`),
                                datasets: [
                                {
                                    label: `Ingresos mensuales de ${ingreso.nombre}`,
                                    data: ingreso?.ingresos_mensuales.map((ing)=> ing.cant),
                                    backgroundColor: [
                                        'rgba(52, 94, 209, 0.5)',
                                        'rgba(235, 30, 23, 0.5)',
                                        'rgba(250, 142, 0, 0.57)',
                                        'rgba(109, 209, 119, 0.8)',
                                        'rgba(71, 163, 209, 0.8)',
                                        'rgba(158, 90, 204, 0.8)'
                                      ],
                                      barPercentage:0.7,                                   
                                },
                                ],
                            }} options={{responsive: true,
                                plugins: {
                                    legend: {
                                      position: 'top',
                                    },
                                    title: {
                                      display: true,
                                      text: `Grafico de ${ingreso.nombre}`,
                                    },
                                },}}/>
                        </div>
                    </Container>
                )
            })
        )
    }

    

    return(
        <Layout>
        <section className='Estadisticas'>
                <h1>Estadisticas de los cursos</h1>
                <h5>Esta seccion tiene como propocito mostrar la informacion de los ingresos de los Cursos</h5>
                <Container className='graficas'>        
                <Bar data={data}
                height={200}
                options={options}></Bar>
                {mostrarIngresos()}
                </Container>
        </section>
        </Layout>
    )   

}

const mapStateToProps = state => ({
    ingresos: state.Ingresos.ingresos
})

export default connect(mapStateToProps,{
    get_ingresos,
}) (Estadisticas)


