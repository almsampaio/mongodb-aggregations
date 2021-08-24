db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "voos" },
  },
  { $unwind: "$voos" },
  { $match: { "voos.airplane": { $in: ["747", "380"] } } },
  { $group: { _id: { airlines: "$airlines", alliance: "$name" }, totalRotas: { $sum: 1 } } },
  { $project: { _id: "$_id.alliance", totalRotas: "$totalRotas" } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
