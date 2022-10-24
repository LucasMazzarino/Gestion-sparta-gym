const conexionLista = (cb = () =>{}) => {
    console.log('Listo para recibir mensajes 📧') 
    cb()
}

const conexionPerdida = (cb = () =>{}) => {
    console.log('Error de autenticación, vuelve a generar el QRCODE (Borrar el archivo session.json)');
    cb()
}


module.exports = {conexionLista, conexionPerdida}