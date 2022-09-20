import {Fragment} from 'react'
import {connect} from 'react-redux'

import Alert from 'react-bootstrap/Alert';

function Alerta ({ alert }) {

  const displayAlert = () => {
      if (alert !== null){
        return (
          <>
              <Alert  variant={`${alert.alertType}`}>
                {`${alert.msg}`}
              </Alert>
          </>
        );
      } else {
          return(
              <Fragment></Fragment>
          )
      }
  }

  return (
      <Fragment>
          {displayAlert()}
      </Fragment>
  )
}

const mapStateToProps = state => ({
  alert: state.Alerta.alert
})

export default connect(mapStateToProps)(Alerta)