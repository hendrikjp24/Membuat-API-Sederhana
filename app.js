const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require("method-override");


//setting express
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(methodOverride('_method'));


// api to get all data




app.listen(port, ()=>{
    console.log(`Web Service running on http:localhost:${port}`);
})