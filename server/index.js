const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(express.json());

const cors = require("cors");

app.use(cors());

app.post("/item", (req, res) => {
  const name = req.body.color;
  const leg = req.body.leg;
  const upperLeg = req.body.sizes.upperLeg;
  const lowerLeg = req.body.sizes.lowerLeg;

  if (name === "" || leg === "" || upperLeg === "" || lowerLeg === "") {
    res.status(400).send("Bad Request");
  } else {
    res.status(200).send("Item Posted!");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
