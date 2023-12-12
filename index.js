const express = require('express');
const app = express();
const data = require('./data.json');
const fs = require('fs');

app.use(express.json());

app.listen(3000, () => console.log("Server listening at port 3000"));


app.get("/data", (req, res) => {
    res.send(data);
});

let storedData = readDataFromFile();

app.post("/post", (req, res) => {
    const requestData = req.body;
    console.log(requestData);

    storedData.push(requestData);
    saveDataToJsonFile(storedData);

    res.send(requestData);
});

function saveDataToJsonFile(data) {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync('data.json', jsonData, 'utf-8');
}

function readDataFromFile() {
    try {
        const fileData = fs.readFileSync('data.json', 'utf-8');
        return JSON.parse(fileData);
    } catch (error) {
        console.error('Error reading data from file:', error.message);
        return [];
    }
}
