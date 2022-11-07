const express = require('express');
const db = require('./config/connection');
const routes = require('./routes')
const { User } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(routes);

app.get('*', (req, res) =>
  res.status(404).json("Path does not exist")
);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}. Visit http://localhost:${PORT}.\n`);
  });
});
