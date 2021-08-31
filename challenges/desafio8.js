db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airName: "$airline.name" },
      pipeline: [
        { $unwind: "$airlines" },
        {
          $match: {
            $expr: {
              $eq: ["$airlines", "$$airName"],
            },
          },
        },
      ],
      as: "airlines_alliances",
    },
  },
  {
    $unwind: "$airlines_alliances",
  },
  {
    $group: {
      _id: "$airlines_alliances.name",
      totalRotas: { $sum: 1 },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
