db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["380", "747"] },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "airline_routes",
    },
  },
  {
    $unwind: "$airline_routes",
  },
  {
    $group: {
      _id: "$airline_routes.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
