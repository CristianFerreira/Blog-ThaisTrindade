'use strict'
const express = require('express');
const app = require('./src/app');
const debug = require('debug')('nodestr:server');
const http = require('http');

// app.use('/dist',express.static('./dist'));
// app.use('/assets',express.static('./dist/assets'));

// app.get('/', (req, res)=>{
//     res.sendFile( __dirname +'/dist/index.html');
// })


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if(isNaN(port))
        return val;
    
    if(port >= 0)
        return port;

    return false;
}

function onError(error) {
    if(error.syscall != 'liste')
        throw error;

    const bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE' :
            console.error(bind + ' is already in use');
            break;
        default: 
            throw error;   
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}