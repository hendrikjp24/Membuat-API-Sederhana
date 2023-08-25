const express = require('express');
const app = express();
const port = 3000;

//setting express
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// api to get all data





app.listen(port, ()=>{
    console.log(`Web Service running on http:localhost:${port}`);
})