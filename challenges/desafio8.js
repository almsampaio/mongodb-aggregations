db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: {
        name: "$airlines",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$$name", "$airline.name"],
            },
          },
        },
      ],
      as: "routes",
    },
  },
  {
    $unwind: "$routes",
  },
  {
    $match: {
      "routes.airplane": {
        $in: ["747", "380"],
      },
    },
  },
  {
    $group: {
      _id: "$name",
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
