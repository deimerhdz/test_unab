const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require("dotenv").config();
class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            home:'/',
            auth:       '/api/auth',
            equipos:  '/api/equipos',
            partidos:   '/api/partidos',
            usuarios:   '/api/usuarios',
        }
        // Conectar a base de datos
        this.conectarDB();
        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    conectarDB() {
        require("./database/config");
    }


    middlewares() {
        // CORS
        this.app.use( cors() );
        // Lectura y parseo del body
        this.app.use(express.static(__dirname + '/public'));
        this.app.use( express.json() );
        this.app.use(morgan('dev'))
    }

    routes() {
        this.app.use( this.paths.auth, require('./routes/auth'));
        this.app.use( this.paths.equipos, require('./routes/equipos.routes'));
        this.app.use( this.paths.usuarios, require('./routes/usuarios.routes'));
        this.app.use( this.paths.partidos, require('./routes/partidos.routes'));
        this.app.use( require('./routes/index.routes'));
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
