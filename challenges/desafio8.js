db.air_alliances.aggregate([
  { $lookup: {
    from: "air_routes",
    let: { alliances_airline: "$airlines" },
    pipeline: [
      { $match: { $and: [
        { $expr: { $in: ["$airline.name", "$$alliances_airline"] } },
        { $expr: { $in: ["$airplane", ["747", "380"]] } },
      ] } },
    ],
    as: "routes",
  } },
  { $group: { _id: "$name", totalRotas: { $sum: { $size: "$routes" } } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
