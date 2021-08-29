db.air_routes.aggregate([
  { $match: { airplane: { $in: ["380", "747"] } } },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "air_routes",
    },
  },
  { $unwind: "$air_routes" },
  {
    $group: {
      _id: "$air_routes.name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
