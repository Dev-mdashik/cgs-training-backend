import http from 'http';
import {home} from './pages/home.js';
import {about} from './pages/about.js';
import {notFound} from './pages/notFound.js';
import {statusCode} from './http/statusCode.js';

const server = http.createServer((req, res) => {    

     if (req.url === '/') {
        statusCode(res, 200);
        res.end('Welcome to the CGS Server');    

     } else if (req.url === '/home') {
        statusCode(res, 200);
        home(req, res);         
      
    } else if (req.url === '/about') {
        statusCode(res, 200);
        about(req, res);       

    } else {
        statusCode(res, 404);
        notFound(req, res);
        
    }
});

const PORT = 3000;

server.listen(PORT, ()=> {
    console.log(`Server started on port ${PORT}`);
})
