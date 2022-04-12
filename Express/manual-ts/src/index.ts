import express from 'express';

const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('Hello World!');
});

app.listen(port, () =>{
    console.log(`server listening on port ${port}`);
});

let f: false = false;