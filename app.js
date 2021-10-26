const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
 
const path = require("path");    
const app = express();
let items = [];

let workItem = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect("mongodb://localhost:27017/todoListdb")
    .then(() => console.log("connection successfull........."))
    .catch((err) => console.log(err));





const itemSchema = new mongoose.Schema(
    {
        itemName: {
            type: String
        }
    }
);

const Item = new mongoose.model("lists", itemSchema);






app.get("/", function (req, res) {
  
    const getDocument = async ()=>{
            const result = await Item
            .find();
            if(result.length == 0){
                const groceryList = async () =>{
                    try{
                        const bread = new Item(
                            {
                                itemName : "Bread"
                            }
                        )
                        const biscuits = new Item(
                            {
                                itemName : "Biscuits"
                            }
                        )
                        const softDrink = new Item(
                            {
                                itemName : "Softdrink"
                            }
                        )
                            const result = await Item.insertMany([bread, biscuits, softDrink]);
                            console.log(result);
                    }catch(err){
                        console.log(err);
                    }
                }
                
                groceryList();
            }
            res.render("list", { listTitle: "Today" , newListItems: result});   
           
           
        }
    
    getDocument();
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



app.listen(3000, function () {
    console.log("Server started on the port 3000");
});