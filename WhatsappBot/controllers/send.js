
const moment = require('moment');
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');
const { limpiarNumero } = require('./handle')
const DELAY_TIME = 170; 
const DIR_MEDIA = `${__dirname}/../mediaSend`;
const { guardarMensaje } = require('../adapter')

/**
 * Enviamos archivos multimedia a nuestro cliente
 * @param {*} number 
 * @param {*} fileName 
 */

const enviarArchivo = (client, number = null, fileName = null) => {
    if(!client) return console.error("El objeto cliente no está definido.");
    try {
        number = limpiarNumero(number || 0)
        const file = `${DIR_MEDIA}/${fileName}`;
        if (fs.existsSync(file)) {
            const media = MessageMedia.fromFilePath(file);
            client.sendMessage(number, media, { sendAudioAsVoice: true });
        }
    } catch(e) {
        throw e;
    }
}

/**
 * Enviamos un mensaje simple (texto) a nuestro cliente
 * @param {*} number 
 */

const sendMessage = async (client, number = null, text = null, trigger = null) => {
   setTimeout(async () => {
    number = limpiarNumero(number)
    const message = text
    client.sendMessage(number, message);
    await leerChat(number, message, trigger)
    console.log(`Enviando mensajes...`);
   },DELAY_TIME)
}

/**
 * Guardar historial de conversacion
 * @param {*} number 
 * @param {*} message 
 */
const leerChat = async (number, message, trigger = null) => {
    number = limpiarNumero(number)
    await guardarMensaje( message, trigger, number )
    console.log('Guardado')
}

module.exports = { sendMessage, enviarArchivo, leerChat }
