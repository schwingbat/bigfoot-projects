const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mountRoutes = require('./routes');
const PORT = process.env.PORT || 5150;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mountRoutes(app);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
