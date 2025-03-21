const express = require("express");
const cors = require("cors");

require("dotenv").config();
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Timestamp API is running");
});

app.get("/api/:date?", (req, res) => {
  const { date } = req.params;
  if (!date) {
    const now = new Date();
    return res.json({ unix: now.getTime(), utc: now.toUTCString() });
  }
  if (!isNaN(date)) {
    date = parseInt(date);
  }

  const validDate = new Date(date);
  if (validDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }
  res.json({ unix: validDate.getTime(), utc: validDate.toUTCString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, res) => {
  console.log("App is running on localhost:" + PORT);
});
