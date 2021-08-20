db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { airline: "$airlines" },
    pipeline: [
      { $match: {
        $expr: {
          $and: [
            { $eq: ["$airline.name", "$$airline"] },
            { $or: [
              { $eq: ["$airplane", "747"] },
              { $eq: ["$airplane", "380"] },
            ] },
          ],
        },
      } },
    ],
    as: "rota",
  } },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum: { $size: "$rota" },
      },
    },
  },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
