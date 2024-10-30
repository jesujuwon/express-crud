const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require("dotenv").config();
const port = 3000;
const MONGO_URL = "mongodb+srv://j3sujuwon:Fakunle707!@express-crud.qb66m.mongodb.net/?retryWrites=true&w=majority&appName=express-crud"
const User = require('./Model/User');


mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(bodyParser.json());

const userRoutes = require('./routes/userRoute');
app.use('/', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/about', (req, res) => {
    res.send('Hello About Page!');
});

app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
});
// mongodb+srv://j3sujuwon:Fakunle707!@express-crud.qb66m.mongodb.net/?retryWrites=true&w=majority&appName=express-crud