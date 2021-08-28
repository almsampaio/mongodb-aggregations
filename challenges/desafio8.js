db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: { alliances: "$airlines" },
      pipeline: [
        { $match: {
          $expr: {
            $in: ["$airline.name", "$$alliances"],
          },
        } },
      ],
      as: "joinList",
    },
  },
  { $unwind: "$joinList" },
  { $match: { "joinList.airplane": { $in: ["747", "380"] } } },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
