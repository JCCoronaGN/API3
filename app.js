const express = require('express');
const mongoose = require("mongoose");


require("./src/config/passport");

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// const db = 'BeduShop'
// const dbUser = 'javiGN'
// const dbPass = 'javiGN'

// const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.qrvngpz.mongodb.net/${db}?retryWrites=true&w=majority`
const uri= process.env.MONGOURI;

mongoose.connect(uri);

app.use('/v1', require('./src/routes'));

const PORT = process.env.PORT;
app.listen(PORT, () => console.log("The server is Alive!!"))

app.get('/',(req, res) => res.send("Hola Mundo"))