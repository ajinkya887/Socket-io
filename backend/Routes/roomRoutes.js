const express = require("express");
const router = express.Router();
const { getRooms } = require("../Controllers/roomController");

router.get("/", getRooms);

module.exports = router;
