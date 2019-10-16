const express = require('express');
const server = express();
//Indica ao servidor que ele deve aceitar JSON
server.use(express.json());

server.get('/projects', (req,res)=>{
        return res.json('Ola Mundo.......');
})

server.listen(4000);