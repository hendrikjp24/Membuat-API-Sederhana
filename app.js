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

//api to get data by name
app.get("/readDataByName/", async (req, res) => {
    
    try {
        console.log(req.query);
        await mahasiswa.find({name: req.query.name}).then(result => {
            res.json({
                status: 200,
                message: "Read Data Mahasiswa By Name Success",
                data : result
            });
        });
        
    } catch (error) {
        res.json({
            status: 400,
            message: "Read Data Error",
            error
        });

    }
    
})

//api to get data by filterbyname 
app.get("/readDataByFilterName", async (req, res) => {
    try {
        // $regex => untuk membuat regex di mongodb
        //$options => digunakkan untuk memberikan option ke regex yang telah dibuat.
        // 'i' => adalah option untuk mengabaikan case sensitive yang dimasukkan
        await mahasiswa.find({name : {$regex: req.query.name, $options: 'i'}}).then(result =>{
            res.json({
                status: 200,
                message: "Read Data By Filtering Name Success",
                data : result
            });
        });
        
    } catch (error) {
        res.json({
            status: 400,
            message: "Error to read data",
            error
        });

    }
})

//API TO ADD DATA
app.post("/add-mahasiswa", async (req, res)=>{
    try {
        await mahasiswa.insertMany(req.body).then(result => {
            console.log(JSON.stringify(req.body));

            res.json({
                status : 200,
                message : "Data mahasiswa berhasil ditambahkan",
                data : result
            });

        });
    } catch (error) {
        res.json({
            status: 400,
            message: "Data mahasiswa gagal ditambahkan",
            error
        })
    }
})

//API to delete data by id
app.delete("/deletDataMahasiswa", async (req, res) => {
    try {
        await mahasiswa.deleteOne({_id : req.query.id}).then(result => {
            res.json({
                status: 200,
                message: "Data Mahasiswa Berhasil Di Delete",
                data: result
            });
        });

    } catch (error) {
        res.json({
            status: 400,
            message: "Error delete data",
            error
        });
    }

})

//API to edit data by id
app.put("/updateData", async (req, res) => {
    try {

        // update data by id
       await mahasiswa.findByIdAndUpdate({_id : req.query.id}, req.body);

       // membaca ulang data berdasarkan id, sehingga data terbaru yang akan di kirimkan
       await mahasiswa.findById({_id : req.query.id}).then(result => {
        res.json({
            status: 200,
            message: "Data berhasil di update",
            data : result
        });
       })

        
    } catch (error) {
        res.status(400);
        res.json({
            status: 400,
            message: "Proses Update Error",
            error : error.message
        });
        
    }

})

// Tidak Harus memproses promise untuk mendapatkan datanya, dengan menggunakan async await,
// kita dapat langsung menampung datanya pada sebuah variabel
app.get("/", async (req, res) => {
    const data = await mahasiswa.find();

    res.json({
        status: 200,
        message: "Read Data Success1",
        data
    });

})

app.listen(port, ()=>{
    console.log(`Web Service running on http:localhost:${port}`);
})