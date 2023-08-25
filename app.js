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

// call connection database
require("./util/db");

//create variable to assign model schema
const mahasiswa = require("./models/Mahasiswa");

// api to get all data
app.get("/read-data", async (req, res)=>{
    try {
        await mahasiswa.find().then(result =>{
        res.json({
            status : 200,
            message : "Read data Success",
            data : result
            });
        });
        
    } catch (error) {
        res.json({
            status: 400,
            message: "Error Read Data",
            erorr
        });

    }

})


//API TO ADD DATA
app.post("/add-mahasiswa", async (req, res)=>{
    try {
        await mahasiswa.insertMany([req.body]).then(result => {
            console.log(JSON.stringify(req.body));

            res.json({
                status : 200,
                message : "Data mahasiswa berhasil ditambahkan",
                data : result
            });

        });
    } catch (error) {
        console.log(error);
    }
})



app.listen(port, ()=>{
    console.log(`Web Service running on http:localhost:${port}`);
})