db.air_routes.aggregate([
  { $match: { airplane: { $in: ["380", "747"] } } },
  { $lookup: {
    from: "air_alliances",
    localField: "airline.name",
    foreignField: "airlines",
    as: "alliance",
  } },
  { $match: {
    "alliance.name": { $exists: 1 },
  } },
  { $group: {
    _id: { $first: "$alliance.name" },
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
