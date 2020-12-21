const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  const userString = JSON.stringify(req.user);
  res.send(`
    <h1>Hello from Express!</h1>
    <pre>${userString}</pre>
  `);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port PORT`);
});
