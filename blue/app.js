const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Hello from BLUE environment");
});

app.listen(3000, () => {
  console.log("BLUE app running on port 3000");
});
