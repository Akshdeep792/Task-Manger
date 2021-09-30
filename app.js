const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");  
const path = require("path");    
const app = express();
let items = [];

let workItem = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));



// console.log(date());

app.get("/", function (req, res) {
    // res.sendFile(__dirname + "index.html");
    
    let day = date.getDate();
    res.render("list", { listTitle: day , newListItems: items});
});

app.post("/", function(req, res){

     let item = req.body.newItem;
    // console.log(itemName);

    if(req.body.list === "Work"){
        workItem.push(item);
        res.redirect("/work");
    }
    else{
    items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function(req, res){
   res.render("list", {listTitle: "Work List", newListItems: workItem});
});

// app.post("/work", function(req , res){
//     let item = req.body.newItem;

//     workItem.push(item);
//     res.redirect("/work");
// })

app.listen(3000, function () {
    console.log("Server started on the port 3000");
});