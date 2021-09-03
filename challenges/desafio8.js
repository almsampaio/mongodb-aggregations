db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    localField: "airlines",
    foreignField: "airline.name",
    as: "routes_airplanes",
  } },
  { $unwind: "$routes_airplanes" },
  { $match: {
    "routes_airplanes.airplane": {
      $in: ["380", "747"],
    },
  } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
