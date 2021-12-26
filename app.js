const express = require("express");
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/conn');   
require('dotenv').config();


// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1/tasks', tasks);



app.get("/", (req,res) => {
    res.send('hello')
})



const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await  connectDB(process.env.ATLAS_URI);
        app.listen(port, () => {
            console.log(`The server is live on ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();


