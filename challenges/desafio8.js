// use("aggregations");
// db.air_alliances.find();

// use("aggregations");
// db.air_routes.find();

// use("aggregations");

db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] } },
  },
  { $lookup: {
    from: "air_alliances",
    localField: "airline.name",
    foreignField: "airlines",
    as: "result",
  },
  },
  { $unwind: "$result" },
  { $group: {
    _id: "$result.name",
    totalRotas: { $sum: 1 },
  },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
