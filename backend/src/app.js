const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const planetRouter = require('./routes/planets.routes');
const agencyRouter = require('./routes/agencies.routes');
const bundleRouter = require('./routes/bundles.routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/planets', planetRouter);
app.use('/api/v1/agencies', agencyRouter);
app.use('/api/v1/bundles', bundleRouter);

app.listen(port, () => {
  console.log(`Travel-X listening on port ${port}`);
});
