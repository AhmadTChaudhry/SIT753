const chai = require('chai');
const expect = chai.expect;
const request = require('request');
const { MongoClient } = require('mongodb');

const baseURL = 'http://localhost:3040';

// Database Connection
const uri = 'mongodb+srv://ahmadtc17:lEHPujvj7D0nruzG@cluster0.fjfikfh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);

describe('Unit Tests', function () {
    let db;

    before(async function () {
        await client.connect();
        db = client.db('form');
    });

    after(async function () {
        await client.close();
    });

    // Test Cases for /POST

    describe('Tests for POST /submit-form with Rollback', function () {
        let insertedId;

        const formData = {
            Name: 'Test Name',
            Email: 'test@example.com',
            Number: '1234567890',
            Birthdate: '1997-02-17',
            City: 'Test City',
            State: 'Test State',
            Postcode: '1234',
            Message: 'This is a test message.'
        };

        it('Should submit valid form data and insert into MongoDB', function (done) {
            request.post({
                url: `${baseURL}/submit-form`,
                json: true,
                body: formData
            }, async function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                expect(body.message).to.equal('Form submitted successfully! Someone will reach out to you :)');

                const collection = db.collection('formData');
                const insertedData = await collection.findOne({ Email: formData.Email });
                expect(insertedData).to.not.be.null;
                insertedId = insertedData._id;
                done();
            });
        });

        it('Should rollback the inserted data', async function () {
            const collection = db.collection('formData');
            await collection.deleteOne({ _id: insertedId });

            const deletedData = await collection.findOne({ _id: insertedId });
            expect(deletedData).to.be.null;
        });
    });

    // Test Cases for /GET

    describe('Tests for GET /', function () {
        it('Should return a status code of 200', function (done) {
            request.get(baseURL, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('Should include the website title "Deakin Tuning"', function (done) {
            request.get(baseURL, function (error, response, body) {
                expect(body).to.include('<title>Deakin Tuning</title>');
                done();
            });
        });

        it('Should include the contact form with id "contactform"', function (done) {
            request.get(baseURL, function (error, response, body) {
                expect(body).to.include('<section id="contactform">');
                done();
            });
        });
    });
});
