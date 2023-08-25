const mongoose = require("mongoose");

const schemaMahasiswa = new mongoose.Schema({
    name : String,
    age : Number,
    jurusan : String,
    contact : {
        email : String,
        noHp : String
    }
})

const mahasiswa = new mongoose.model('Mahasiswa', schemaMahasiswa);

module.exports = mahasiswa;