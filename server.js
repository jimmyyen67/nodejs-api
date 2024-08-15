const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const uri = 'mongodb+srv://jimmy:eAM8Rhizoo5RAOsC@cluster0.jpvnt.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0';

app.get('/', (req, res) => {
    res.send({
        "message": "Hello World"
    })
})



mongoose.connect(uri).then(() => {
    console.log('<< Connected to MongoDB >>');
    app.listen(port, () => {
        console.log(`[NodeJs-API] listening port ${port}`);
    })
}).catch((error) => {
    console.log(error);
});