const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.connect("mongodb+srv://ardatahtaci:aA135798!@cluster0.oe6kmj9.mongodb.net/toDoListDb");

let today = date.getNumericDate();


const itemSchema = mongoose.Schema({
    name: String,
    date: String,
    listType: String,
});

const Item = mongoose.model("item", itemSchema);


app.get("/", function (req, res) {

    let day = date.getDate();


    Item.find({ date: today }).then((item) => {

        let items = JSON.stringify(item);
        items = JSON.parse(items);

        if (typeof (items) != "undefinded") {
            res.render("list", { listTitle: day, items: items });
        }
    }).catch((err) => {

        console.log(err);
    });


});

app.get("/lists/:date", function (req, res) {

    let date = req.params.date;
    date = _.replace(date, "-", "/");
    date = _.replace(date, "-", "/");

    Item.find({ date: date }).then((item) => {

        let items = JSON.stringify(item);
        items = JSON.parse(items);

        if (typeof (items) != "undefinded") {
            res.render("prev", { listTitle: date, items: items });
        }
    }).catch((err) => {

        console.log(err);
    });

});

app.post("/list", function (req, res) {
    let date = req.body.date;
    date = _.replace(date, "/", "-");
    date = _.replace(date, "/", "-");
    res.redirect("/lists/" + date);
});

app.post("/", function (req, res) {

    const itemName = req.body.newItem;
    const newItem = new Item({
        name: itemName,
        date: today,
        listType: "Main",
    });

    if (req.body.addToList === "Work") {
        workItems.push(item);
        res.redirect("/work");
    }
    else {

        newItem.save().then(() => {
            res.redirect("/");
        })

    }

});

app.post("/delete", function (req, res) {
    const itemID = req.body.delete;
    Item.findByIdAndRemove(itemID, function (err) {
        if (err) console.log(err);
    });

    res.redirect("/");
});

app.listen(3000, function () {
    {
        console.log("Server has started on local host 3000");
    }
});
