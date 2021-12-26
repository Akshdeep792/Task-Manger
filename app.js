const express = require("express");
const app = express();
const tasks = require('./routes/tasks')



// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
// app.get("/", (req,res) => {
//     res.send("Hello");
// })

app.use('/api/v1/tasks', tasks);




















const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`The server is live on ${port}`);
})
