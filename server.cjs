// const express = require('express');

// const app = express();

// app.use(express.static('docs'))

// app.listen(3000, () =>
//   console.log('Example app listening on port 3000!'),
// );

const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');

const app = express();
// const port = process.env.PORT

const key = fs.readFileSync('localhost-key.pem', 'utf-8');
const cert = fs.readFileSync('localhost.pem', 'utf-8');

// app.use('/', express.static('public'));
// app.use('/drawer', express.static('public/drawer.html'));
// app.use('/models/', express.static('models'));


app.use(express.static('docs'))
app.use(express.static('pics'))

app.use(cors());
app.use(express.json());

let map = {};

https.createServer({ key, cert }, app).listen(3001);
