const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'client')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/data.json'));
});

app.listen(3000, () => {
    console.log('Server running on port 3000.');
})