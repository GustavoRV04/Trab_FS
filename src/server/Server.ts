import express from 'express';

const server = express();



server.post('/teste', (req, res) => {
    return res.send('Hello World');
});

export { server };