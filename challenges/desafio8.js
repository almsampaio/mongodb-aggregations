db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: {
        allianceName: "$name",
        airlineName: "$airlines",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$airline.name", "$$airlineName"],
            },
            airplane: { $in: ["380", "747"] },
          },
        },
      ],
      as: "matching_routes",
    },
  },
  {
    $project: {
      name: 1,
      airlines: 1,
      num_rotas: {
        $size: "$matching_routes",
      },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum: "$num_rotas",
      },
    },
  },
  {
    $sort: {
      totalRotas: -1,
    },
  },
  {
    $limit: 1,
  },
]);
