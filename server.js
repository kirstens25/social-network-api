const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('running at http://localhost:' + PORT)
})