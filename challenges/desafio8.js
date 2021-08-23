db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airlineName: "$airline.name" },
      pipeline: [
        { $unwind: "$airlines" },
        {
          $match: {
            $expr: {
              $and: [{ $eq: ["$airlines", "$$airlineName"] }],
            },
          },
        },
        { $project: { _id: 0, name: 1 } },
      ],
      as: "routes_alliances",
    },
  },
  { $unwind: "$routes_alliances" },
  {
    $group: {
      _id: "$routes_alliances.name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
