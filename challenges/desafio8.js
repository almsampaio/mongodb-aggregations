db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "air_alliances",
    },
  },
  {
    $match: { "air_alliances.name": { $exists: true } },
  },
  {
    $group: {
      _id: "$air_alliances.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  { $limit: 1 },
  {
    $unwind: "$_id",
  },
]);
