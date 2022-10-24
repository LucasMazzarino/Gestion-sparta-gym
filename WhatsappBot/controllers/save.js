const mimeDb = require('mime-db')
const fs = require('fs')

/**
 * Guardamos archivos multimedia que nos envíen
 * @param {*} media 
 */


const guardarArchivo = (media) => {
    const extensionProcess = mimeDb[media.mimetype]
    const ext = extensionProcess.extensions[0]
    fs.writeFile(`./media/${Date.now()}.${ext}`, media.data, { encoding: 'base64' }, function (err) {
        console.log('Archivo guardado! ');
    });
}

module.exports = {guardarArchivo}