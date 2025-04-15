const express = require("express");
const router = express.Router();
const { downloadChats } = require("../Controllers/download");

router.get("/", downloadChats);

module.exports = router;
