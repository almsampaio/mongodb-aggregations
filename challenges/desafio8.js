db.air_routes.aggregate([
  {
    $match: {
      $or: [
        { airplane: "747" },
        { airplane: "380" },
      ],
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { route_company: "$airline.name", route_company_abr: "$airline.iata" },
      pipeline: [
        {
          $match: {
            $expr: {
              $or: [
                { $in: ["$$route_company", "$airlines"] },
                // { $in: ["$$route_company_abr", "$airlines"] },
              ],
            },
          },
        },
        { $project: { name: 1, _id: 0 } },
      ],
      as: "alliance",
    },
  },
  {
    $unwind: "$alliance",
  },
  {
    $group: {
      _id: "$alliance.name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  {
    $limit: 1,
  },
]);
