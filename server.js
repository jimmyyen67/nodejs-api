const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const uri = 'mongodb+srv://jimmy:eAM8Rhizoo5RAOsC@cluster0.jpvnt.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0';

const Product = require('./models/productModel');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send({
        "message": "Hello World"
    })
})

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

app.post('/products', async (req, res) => {
    try {
        // Check if req.body contains the required fields
        if (!req.body.name) {
            return res.status(400).json({ message: "Please provide a name for the product" });
        }
        if (!req.body.quantity) {
            return res.status(400).json({ message: "Please provide a quantity for the product" });
        }
        if (!req.body.price) {
            return res.status(400).json({ message: "Please provide a price for the product" });
        }

        // Optional: Validate data types
        if (typeof req.body.name !== 'string' ||
            typeof req.body.quantity !== 'number' ||
            typeof req.body.price !== 'number') {
            return res.status(400).json({ message: "Invalid data types. Name should be a string, quantity and price should be numbers" });
        }

        const product = await Product.create(req.body);

        res.status(200).send(product);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        // Can not find the product of the id in database
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})


// Connect to MongoDB using the provided URI
// Once connected, start the Express server
// If there's an error connecting to MongoDB, log the error
mongoose.connect(uri).then(() => {
    console.log('<< Connected to MongoDB >>');
    app.listen(port, () => {
        console.log(`[NodeJs-API] listening port ${port}`);
    })
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});