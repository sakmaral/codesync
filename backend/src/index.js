const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
dotenv.config({ path: `.env.local`, override: true });

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
