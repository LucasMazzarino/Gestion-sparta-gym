const { guardarMensajeJSON } = require('./jsonDb')
const { obtenerDataIA } = require('./diaglogflow')
const  palabrasClave = require('../flow/palabrasClave.json')
const  respuestasClave = require('../flow/respuestasClave.json')

const get = (message) => new Promise((resolve, reject) => {
 

    if (process.env.DATABASE === 'none') {
        const { key } = palabrasClave.find(k => k.keywords.includes(message)) || { key: null }
        const response = key || null
        resolve(response)
    }

})


const respuesta = (step) => new Promise((resolve, reject) => {
 
    if (process.env.DATABASE === 'none') {
        let resData = { replyMessage: '', media: null, trigger: null }
        const responseFind = respuestasClave[step] || {};
        resData = {
            ...resData, 
            ...responseFind,
            replyMessage:responseFind.replyMessage.join('')}
        resolve(resData);
        return 
    }
   
})

const obtenerIA = (message) => new Promise((resolve, reject) => {
    /**
     * Para usar Dialogflow
     */
     if (process.env.DATABASE === 'dialogflow') {
        let resData = { replyMessage: '', media: null, trigger: null }
        obtenerDataIA(message,(dt) => {
            resData = { ...resData, ...dt }
            resolve(resData)
        })
    }
})

/**
 * 
 * @param {*} message 
 * @param {*} date 
 * @param {*} trigger 
 * @param {*} number 
 * @returns 
 */

const guardarMensaje = ( message, trigger, number  ) => new Promise( async (resolve, reject) => {
     switch ( process.env.DATABASE ) {       
         case 'none':
             resolve( await guardarMensajeJSON( message, trigger, number ) )
             break;
         default:
             resolve(true)
             break;
    }
})

module.exports = { get, respuesta, obtenerIA, guardarMensaje }