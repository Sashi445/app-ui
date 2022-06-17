const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("", (req, res) => {
  return res.json({ message: "Hello, World!!" });
});

let stateCache = [];

app.post("/api/state/cache", async (req, res) => {
  const state = req.body;

  if (state !== null) {
    stateCache = [...stateCache, state];
    return res.status(204).json({message : "SUCCESS"});
  } else {
    return res.status(400);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
