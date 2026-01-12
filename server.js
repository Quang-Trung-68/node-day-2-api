require("module-alias/register");
const express = require("express");
const cors = require("cors");

const { loadDB } = require("@root/utils/jsonDB.js");
const routes = require("@/routes");

const app = express();
app.use(express.json());
app.use("/api", routes);

const corsOptions = {
  origin: ["http://localhost:5173", "https://quang-trung-68.github.io"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  maxAge: 3600,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const port = 3000;
app.listen(port, () => {
  console.log("Server running on port ", port);
});
