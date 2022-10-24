const app = require('./app');
require('./db')

require('dotenv').config()

async function Main(){
    await app.listen(`${process.env.PORT}`,()=>{
        console.log(`Escuchando en el puerto -> ${process.env.PORT}`);
    });
};

Main();