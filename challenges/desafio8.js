db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  { $lookup: {
    from: "air_alliances",
    localField: "airline.name",
    foreignField: "airlines",
    as: "line_routes",
  } }, { $unwind: "$line_routes" }, {
    $group: {
      _id: "$line_routes.name",
      totalRotas: { $sum: 1 },
    },
  }, { $sort: { totalRotas: -1 } }, { $limit: 1 }]);
