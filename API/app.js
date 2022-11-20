const Router = require("./path");
const express = require('express');
const app = express();
const port = 3002;

app.use(express.json());
app.use(Router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});