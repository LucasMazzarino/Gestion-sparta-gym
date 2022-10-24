module.exports = (socket) => {
    return {
        enviarQR:(qr) => {
            socket.emit('conexion_qr',{
                qr
            })
        },
        enviarStatus:() => {
            socket.emit('conexion_status',{
                a:1
            })
        }
    }

}

