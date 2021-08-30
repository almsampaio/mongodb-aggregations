db.air_alliances.aggregate([
  {
    $lookup: {
      from: "air_routes",
      let: {
        airlines_array: "$airlines",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $in: ["$airline.name", "$$airlines_array"] },
                { $in: ["$airplane", ["747", "380"]] },
              ],
            },
          },
        }],
      as: "result",
    },
  },
  {
    $project: {
      _id: "$name",
      totalRotas: { $size: "$result" },
    },
  },
  {
    $sort: { totalRotas: -1 },
  },
  {
    $limit: 1,
  },
]);
