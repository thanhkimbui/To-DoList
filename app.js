const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const port = 3000;

const items = ["Buy Foot", "Cook Food", "Eat Food"];
const workItems = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (rootGetReq, rootGetRes) => {
  // let day = date.getDay();
  let day = date.getDate();

  rootGetRes.render("list", { listTitle: day, newListItems: items });
});

app.post("/", (rootPostReq, rootPostRes) => {
  let item = rootPostReq.body.newItem;

  if (rootPostReq.body.list === "Work") {
    workItems.push(item);
    rootPostRes.redirect("/work");
  } else {
    items.push(item);
    rootPostRes.redirect("/");
  }
});

app.get("/work", (workGetReq, workGetRes) => {
  workGetRes.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", (workPostReq, workPostRes) => {
  let item = workPostReq.body.newItem;
  workItems.push(item);
  workPostRes.redirect("/work");
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
