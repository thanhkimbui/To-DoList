const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

let items = ["Buy Foot", "Cook Food", "Eat Food"];
let workItems = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (rootGetReq, rootGetRes) => {
  let today = new Date();
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };

  let day = today.toLocaleDateString("en-US", options);
  /*   var currentDay = today.getDay();
  var day = "";

  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
      console.log("Error: Current day is equal to: " + currentDay);
      break;
  } */
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
