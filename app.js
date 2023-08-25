const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require("method-override");


//setting express
app.use(express.urlencoded({extended : true}));

// supaya bisa mengelola json
app.use(express.json());

// supaya bisa melakukan method override put and delete
app.use(methodOverride('_method'));


// api to get all data




app.listen(port, ()=>{
    console.log(`Web Service running on http:localhost:${port}`);
})