db.air_routes.aggregate([
  { $match: { $or: [{ airplane: "747" }, { airplane: "380" }] } },
  {
    $lookup: {
      from: "air_alliances",
      localField: "airline.name",
      foreignField: "airlines",
      as: "alliance",
    } },
  { $group: { _id: "$alliance.name", totalRotas: { $sum: 1 } } },
  { $match: { _id: { $size: 1 } } },
  { $unwind: "$_id" },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
