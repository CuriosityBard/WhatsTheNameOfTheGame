const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/index.html'));
});

app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/data.json'));
});

app.get('/scripts/main.js', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/scripts/main.js'));
})

app.listen(3000, () => {
    console.log('Server running on port 3000.');
})