import express from 'express';
import mongoose from 'mongoose';
import productStore from '../api/api/models/productStore/productStore.js';

const app = express()
const port = 5500

const mongoURL = "mongodb+srv://davidciliberto:Airespty1@cluster0.ia5hb.mongodb.net/productos?retryWrites=true&w=majority"

mongoose.connect(mongoURL, {useUnifiedTopology: true})

app.use(express.json({limit: "50mb"}))

app.post("/api/products", (req, res) => {
let productData = req.body
let mongoRecord = []
productData.forEach(product => {
    mongoRecord.push({
        name: product.name,
        producType: product.productType,
        price: product.price,
        rating: product.rating,
        image: product.image,
        description: product.description

    })
});

   productStore.create(mongoRecord, (err, records) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(records)
        }
   })
})

app.delete("/api/products", (req, res) => {
    productStore.deleteMany({}, (err) => {
        res.status(500).send(err)
    })
})

app.get("/api/products", (req, res) => {
    productStore.find({}, (err, docs) => {
        if(err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(docs)
        }
    })
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})