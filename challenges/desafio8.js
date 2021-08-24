// https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "airRoutes",
    },
  },
  { $unwind: "$airRoutes" },
  { $match: { "airRoutes.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: "$name", totalRotas: { $count: {} } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
