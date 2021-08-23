db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: { airlinesArray: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $in: ["$airline.name", "$$airlinesArray"] },
                { $in: ["$airplane", ["747", "380"]] },
              ],
            },
          },
        },
      ],
      as: "routes",
    },
  },
  { $unwind: "$routes" },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
