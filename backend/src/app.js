
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth",require("./routes/auth.routes"));
app.use("/api/users",require("./routes/user.routes"));
app.get("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;
