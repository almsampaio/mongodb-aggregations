db.air_routes.aggregate([
  {
    $match: {
      airplane: {
        $in: ["747", "380"],
      },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: {
        airline: "$airline.name",
      },
      pipeline: [
        {
          $unwind: "$airlines",
        },
        {
          $project: {
            _id: 0,
          },
        },
        {
          $match: {
            $expr: {
              $eq: ["$airlines", "$$airline"],
            },
          },
        },
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
      totalRotas: {
        $sum: 1,
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
