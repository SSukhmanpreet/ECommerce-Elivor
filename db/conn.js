const mongoose = require("mongoose");
// const MongoClient = require('mongodb').MongoClient;

//defining database name
const dbName = 'EComProjectDB';
const url = `mongodb+srv://anmol:test1234@cluster0.2majdct.mongodb.net/EComProjectDB?retryWrites=true&w=majority`;
// const url = `mongodb://localhost:27017/${dbName}`;

// MongoClient.connect(url, { useNewUrlParser: true })
//     .then(() => {
//         console.log(`Connected MongoDB URL: ${url}`)
//         console.log(`Connection started to database: ${dbName}`);
//     })
//     .catch((error) => {
//         console.log(error.message);
//     });


//connecting to database via url
// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
//     if (err) return console.log(err)

//     // Storing a reference to the database so you can use it later
//     console.log("####--MONGODB--####");
//     db = client.db(dbName)
//     console.log(`Connected MongoDB: ${url}`)
//     console.log(`Database: ${dbName}`)
// })
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connect(process.env.MONGODB_URI || url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("####--MONGOOSE--####");
        console.log(process.env.MONGODB_URI || url);
        console.log(`Connection started to database: ${dbName}`);
    })
    .catch((error) => {
        console.log(error.message);
    });
