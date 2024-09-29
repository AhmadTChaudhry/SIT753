const express = require("express");
const bodyParser = require('body-parser');
const { connectToDB, insertFormData } = require('./model');

const app = express();
const port = 3040;

app.use(express.static('public'));
app.use(bodyParser.json());

connectToDB().catch(console.dir);

app.post('/submit-form', async (req, res) => {
    try {
        const formData = req.body;
        console.log("Received form data:\n", formData);
        await insertFormData(formData);
        res.json({ message: 'Form submitted successfully! Someone will reach out to you :)' });
    } catch (error) {
        console.error("Error inserting form data:", error);
        res.status(500).json({ message: 'Failed to submit form' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
