const rooms = ["General", "PHI", "FLIP", "TRAX", "Zydus"];

const getRooms = (req, res) => {
  res.json(rooms);
};

module.exports = { getRooms };
