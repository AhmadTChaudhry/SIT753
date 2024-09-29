const { MongoClient, ServerApiVersion } = require('mongodb');

// MongoDB Setup
const uri = 'mongodb+srv://ahmadtc17:lEHPujvj7D0nruzG@cluster0.fjfikfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let collection;

async function connectToDB() {``
    try {
        await client.connect();
        const database = client.db('form');
        collection = database.collection('formData');
        console.log("Connected to MongoDB/DB/Collection");
    } catch (ex) {
        console.error("Error connecting to MongoDB:", ex);
    }
}

async function insertFormData(formData) {
    try {
        await collection.insertOne(formData);
    } catch (error) {
        console.error("Error inserting form data:", error);
        throw error;
    }
}

module.exports = { connectToDB, insertFormData };
