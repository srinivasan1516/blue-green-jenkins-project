const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send(`Hello from ${process.env.APP_COLOR} environment`);
});

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

