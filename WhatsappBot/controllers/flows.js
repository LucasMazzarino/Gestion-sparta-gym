const {get, respuesta, obtenerIA} = require('../adapter')
const {guardarArchivoExternoFile, verificarUrl} = require('./handle')

const obtenerMensajes = async (message) => {
    const data = await get(message)
    return data
}

const responderMensajes = async (step) => {
    const data = await respuesta(step)
    if(data && data.media){
        const file = verificarUrl(data.media) ? await guardarArchivoExternoFile(data.media) : data.media;
        return {...data,...{media:file}}
    }
    return data
}

const botRespuesta = async (message) => {
    const data = await obtenerIA(message)
    if(data && data.media){
        const file = await guardarArchivoExternoFile(data.media)
        return {...data,...{media:file}}
    }
    return data
}


module.exports = { obtenerMensajes, responderMensajes, botRespuesta }