const express = require('express');
const morgan = require('morgan');
const jwt = require('express-jwt');
const users = require('./users');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use(
  jwt({
    secret: 'super-secret-secret',
    algorithms: ['RS256'],
    credentialsRequired: false,
  })
);

app.use(express.static("dist"));

app.post("/login", (req, res, next) => {
  console.log(req.body);
  res.send({message: 'success!'})
})

// app.get('/', (req, res, next) => {
//   console.log(req.headers);
//   const userString = JSON.stringify(req.user);
//   res.send(`
//     <h1>Hello from Express!</h1>
//     <pre>${userString}</pre>
//   `);
// });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening on port PORT`);
});
