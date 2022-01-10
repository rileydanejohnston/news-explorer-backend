const express = require('express');

// need to determine the port - 3000 is default
const { PORT = 3000 } = process.env;

// need to create app variable
const app = express();

// need to listen on a port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});