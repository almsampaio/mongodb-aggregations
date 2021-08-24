const collection = db.air_alliances;

collection.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "routes",
    },
  },
  { $unwind: "$routes" },
  { $match: { $or: [{ "routes.airplane": "747" }, { "routes.airplane": "380" }] } },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
