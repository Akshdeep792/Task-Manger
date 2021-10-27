// const express = require("express");
// const bodyParser = require("body-parser");
// const mongoose = require("mongoose");

// const path = require("path");
// const app = express();
// let items = [];

// let workItem = [];
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect("mongodb://localhost:27017/todoListdb")
//     .then(() => console.log("connection successfull........."))
//     .catch((err) => console.log(err));

// const defaultItems = ["bread", "biscuit", "softDrink"];



// const itemSchema = new mongoose.Schema(
//     {
//         itemName: {
//             type: String
//         }
//     }
// );

// const listSchema = new mongoose.Schema({
//     name: String,
//     items: [itemSchema]
// }
// )

// const Item = new mongoose.model("lists", itemSchema);
// const List = new mongoose.model("List", listSchema);

// app.get("/", function (req, res) {

//     const getDocument = async () => {
//         const result = await Item.find();
//         if (result.length == 0) {
//             const groceryList = async () => {
//                 try {
//                     const bread = new Item(
//                         {
//                             itemName: "Bread"
//                         }
//                     )
//                     const biscuits = new Item(
//                         {
//                             itemName: "Biscuits"
//                         }
//                     )
//                     const softDrink = new Item(
//                         {
//                             itemName: "Softdrink"
//                         }
//                     )
//                     const result = await Item.insertMany([bread, biscuits, softDrink]);
//                     console.log(result);
//                 } catch (err) {
//                     console.log(err);
//                 }
//             }

//             groceryList();
//         }
//         res.render("list", { listTitle: "Today", newListItems: result });


//     }

//     getDocument();
// });


// app.get("/:customListName", function (req, res) {
//     const customListName = req.params.customListName;

//     List.findOne({ name: customListName }, function (err, foundList) {
//         if (!err) {
//             if (!foundList) {
//                 const List = async () => {
//                     try {
//                         const newItem = new List(
//                             {
//                                 name: customListName,
//                                 items: defaultItems
//                             }

//                         )
//                         newItem.save();
//                         // res.redirect("/");
//                         res.redirect("/" + customListName);
//                     }
//                     catch (err) {
//                         console.log(err);
//                     }
//                 }
//                 List(); 
//             } else {
//                 res.render("list", { listTitle: foundList.name, newListItems: foundList.item });
//             }
//         }});
// });

// app.post("/", function (req, res) {

//     let iName = req.body.newItem;
//     // console.log(itemName);
//     const List = async () => {
//         try {
//             const newItem = new Item(
//                 {
//                     itemName: iName
//                 }
//             )
//             newItem.save();
//             res.redirect("/");
//         }
//         catch (err) {
//             console.log(err);
//         }


//     }
//     List();


// });

// app.post("/delete", function (req, res) {
//     const checkedItemId = req.body.checkbox;
//     const deleteDocument = async (_id) => {
//         try {
//             const result = await Item.findByIdAndDelete({ _id });

//             res.redirect("/");
//         } catch (err) {
//             console.log(err);
//         }
//     }
//     deleteDocument(checkedItemId);
// })





// app.listen(3000, function () {
//     console.log("Server started on the port 3000");
// });






const express = require("express");
const bodyParser = require("body-parser");
const mongoose =require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListdb")
    .then(() => console.log("connection successfull........."))
    .catch((err) => console.log(err));


//// ITEM SCHEMA////
const itemsSchema = {
  name: String
};

const Item = mongoose.model("Item", itemsSchema);

////DEFAULT ITEMS////
const item1 = new Item ({
    name: "Type a new item below"
  });

const item2 = new Item ({
    name: "Click the + button to add the new item"
  });

const item3 = new Item ({
    name: "<--Click this to delete an item"
  });


const defaultItems = [item1, item2, item3];

////CUSTOM LIST ITEM SCHEMA////
const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

//////HOME ROUTE/////
app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {
        Item.insertMany(defaultItems, function(err) {
          if (err) {
            console.log(err); 
          } else {
            console.log("Successfully saved default items to DB");
          }
        });
      res.redirect("/");
    } else {
      res.render("list", {listTitle: "Today", newListItems: foundItems});
    }
  })

});

/////ADD NEW ITEM/////
app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if (itemName !== "") {

    if (listName === "Today") {
     item.save();
     res.redirect("/");

   }  else {
     ///// for custom list////
     List.findOne({name: listName}, function(err, foundList) {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/" + listName);
      })
   }
  }

});

/////CUSTOM LIST//////
app.get("/:customListName", function(req, res) {

    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName}, function(err, foundList) {
      if (!err) {
        if (!foundList) {

         ////create a new list////
          const list = new List ({
              name: customListName,
              items: defaultItems
            })

            list.save();
            res.redirect("/" + customListName);
        } else {

        /////Show an existing list////       
        res.render("list", {listTitle: foundList.name, newListItems: foundList.items});
        }

      }
    })
});


////DELETE ITEM/////
app.post("/delete", function(req, res) {
  
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {

    Item.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        console.log("Successfully deleted item");
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
       if(!err) {
         res.redirect("/" + listName);
       }
    }) 
  }

    
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully!");
});