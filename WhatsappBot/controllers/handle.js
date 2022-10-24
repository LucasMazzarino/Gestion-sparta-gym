const { Client, LocalAuth } = require('whatsapp-web.js');
const http = require('http'); 
const https = require('https'); 
const fs = require('fs');
const qr = require('qr-image')

const MULTI_DEVICE = process.env.MULTI_DEVICE || 'true';

const limpiarNumero = (number) => {
    number = number.replace('@c.us', '');
    number = `${number}@c.us`;
    return number
}

const guardarArchivoExternoFile = (url) => new Promise((resolve, reject) => {
    const ext = url.split('.').pop()
    const checkProtocol = url.split('/').includes('https:');
    const handleHttp = checkProtocol ? https : http;
    const name = `${Date.now()}.${ext}`;
    const file = fs.createWriteStream(`${__dirname}/../mediaSend/${name}`);
    console.log(url)
     handleHttp.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close();  
            resolve(name)
        });
        file.on('error', function() {
            console.log('errro')
            file.close(); 
            resolve(null)
        });
    });
})

const verificarUrl = (path) => {
    try{
        regex = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i;
        match = path.match(regex);
        return match[0]
    }catch(e){
        return null
    }
}

const generarImagen = (base64, cb = () => {}) => {
    let qr_svg = qr.image(base64, { type: 'svg', margin: 4 });
    qr_svg.pipe(require('fs').createWriteStream('./mediaSend/qr-code.svg'));
    console.log('El código QR se actualiza cada minuto');    
    cb()
}

const verificarArchivoEnv = () => {
    const pathEnv = `${__dirname}/../.env`;
    const isExist = fs.existsSync(pathEnv);
    if(!isExist){
        console.log(`ATENCION! te falta crear tu archivo .env de lo contrario no funcionara`)
    }
}

/**
 * 
 * @param {*} session 
 * @param {*} cb 
 */
const crearCliente =  () => {
    client = new Client({
        authStrategy: new LocalAuth(
            {dataPath: './sessions/',
            clientId: 'bot'}),
        puppeteer: { headless: false, args: ['--no-sandbox','--disable-setuid-sandbox'] }
 
    });
}

const esNumeroValido = (rawNumber) => {
    const regexGroup = /\@g.us\b/gm;
    const exist = rawNumber.match(regexGroup);
    return !exist
}

module.exports = {limpiarNumero, guardarArchivoExternoFile, generarImagen, verificarUrl, verificarArchivoEnv, crearCliente, esNumeroValido}