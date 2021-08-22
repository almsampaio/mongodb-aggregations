db.air_routes.aggregate([
  {
    $match: {
      airplane: { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$airline.name",
      count: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "air_alliances",
      let: { airline: "$_id", countPlanes: "$count" },
      pipeline: [
        {
          $match: {
            $expr: {
              $in: ["$$airline", "$airlines"],
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
      as: "test",
    },
  },
  {
    $group: {
      _id: "$test.name",
      finalSum: { $sum: "$count" },
    },
  },
  {
    $unwind: "$_id",
  },
  {
    $sort: {
      finalSum: -1,
    },
  },
  {
    $project: {
      _id: 1,
      totalRotas: "$finalSum",
    },
  },
  {
    $limit: 1,
  },
]);
