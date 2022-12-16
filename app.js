const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
var items = [];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  var today = new Date();
  var options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  var day = today.toLocaleDateString("en-US", options);
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
  res.render("list", { kindOfDay: day, newListItems: items });
});

app.post("/", (postReq, postRes) => {
  var item = postReq.body.newItem;
  items.push(item);
  postRes.redirect("/");
  // postRes.render("list", { newListItem: item });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
