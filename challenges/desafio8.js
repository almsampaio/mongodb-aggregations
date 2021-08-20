db.air_alliances.aggregate(
  [
    {
      $unwind: "$airlines",
    },
    {
      $lookup: {
        from: "air_routes",
        let: { airlineName: "$airlines" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$airline.name", "$$airlineName"],
              },
            },
          },
        ],
        as: "unwindElement",
      },
    },
    { $unwind: "$unwindElement" },
    {
      $match: {
        "unwindElement.airplane": { $in: ["747", "380"] },
      },
    },
    {
      $group: {
        _id: "$name",
        totalRotas: { $sum: 1 },
      },
    },
    { $sort: { totalRotas: -1 } },
    { $limit: 1 },
  ],
);
