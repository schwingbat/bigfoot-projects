const express = require('express');
const app = express();
const mountRoutes = require('./routes');
const PORT = process.env.PORT || 5150;

mountRoutes(app);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});