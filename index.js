const express = require('express');
const app = express();

app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile('./client/index.html');
});

app.get('/data', (req, res) => {
    res.sendFile('./data.json');
});

app.listen(3000, () => {
    console.log('Server running on port 3000.');
})