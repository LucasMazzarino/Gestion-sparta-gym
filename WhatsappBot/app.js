require('dotenv').config()
const fs = require('fs');
const express = require('express');
const cors = require('cors')
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { middlewareClient } = require('./middleware/client')
const { generarImagen, limpiarNumero, verificarArchivoEnv, crearCliente, esNumeroValido } = require('./controllers/handle')
const { conexionLista, conexionPerdida } = require('./controllers/connection')
const { guardarArchivo } = require('./controllers/save')
const { obtenerMensajes, responderMensajes, botRespuesta } = require('./controllers/flows')
const { enviarArchivo, sendMessage, leerChat } = require('./controllers/send')
const app = express();
app.use(cors())
app.use(express.json())
const MULTI_DEVICE = process.env.MULTI_DEVICE || 'true';
const server = require('http').Server(app)

const port = process.env.PORT || 3000
var client;
app.use('/', require('./routes/web'))

/**
 * Escuchamos cuando entre un mensaje
 */

const escucharMensaje = () => client.on('message', async msg => {
    const { from, body, hasMedia } = msg;

    if(!esNumeroValido(from)){
        return
    }
   
    if (from === 'status@broadcast') {
        return
    }

    message = body.toLowerCase();
    console.log('Mensaje recibido: ',message)
    const number = limpiarNumero(from)
    await leerChat(number, message)

    /**
     * Guardamos el archivo multimedia que nos envian
     */

    if (process.env.SAVE_MEDIA && hasMedia) {
        const media = await msg.downloadMedia();
        guardarArchivo(media);
    }

    /**
     * Para el uso de Dialogflow
     */

    if (process.env.DATABASE === 'dialogflow') {
        if(!message.length) return;
        const response = await botRespuesta(message);
        await sendMessage(client, from, response.replyMessage);
        if (response.media) {
            enviarArchivo(client, from, response.media);
        }
        return
    }
  

    /**
     * Respondemos el primer paso si encuentra palabras clave
     */

    const step = await obtenerMensajes(message);

    if (step) {
        const response = await responderMensajes(step);

     
        await sendMessage(client, from, response.replyMessage, response.trigger);
     

        if (!response.delay && response.media) {
            enviarArchivo(client, from, response.media);
        }
        if (response.delay && response.media) {
            setTimeout(() => {
                enviarArchivo(client, from, response.media);
            }, response.delay)
        }
        return
    }

    //Mensaje por defecto

    if (process.env.DEFAULT_MESSAGE === 'true') {
        const response = await responderMensajes('DEFAULT')
        await sendMessage(client, from, response.replyMessage, response.trigger);      
    }
});



client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: { headless: true, args: ['--no-sandbox','--disable-setuid-sandbox'] }
    });
    
client.on('qr', qr => generarImagen(qr, () => {
        qrcode.generate(qr, { small: true });
        
        console.log(`Ver QR http://localhost:${port}/qr`)
        socketEvents.enviarQR(qr)
}))

client.on('ready', (a) => {
        conexionLista()
        escucharMensaje()
 
});

client.on('auth_failure', (e) => {
     
});

client.on('authenticated', () => {
        console.log('Chatbot conectado! 🤖'); 
});

    client.initialize();





server.listen(port, () => {
    console.log(`El server esta listo para el puerto ${port}`);
})

verificarArchivoEnv();

