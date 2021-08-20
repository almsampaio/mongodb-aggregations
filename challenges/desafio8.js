db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airline_name: "$airline.name" },
      pipeline: [
        { $unwind: "$airlines" },
        {
          $match: {
            $expr: {
              $eq: ["$airlines", "$$airline_name"],
            },
          },
        },
        {
          $project: {
            _id: 0,
            name: 1,
          },
        },
      ],
      as: "air_routes_alliances",
    },
  },
  { $unwind: "$air_routes_alliances" },
  {
    $group: {
      _id: "$air_routes_alliances.name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  { $limit: 1 },
]);
