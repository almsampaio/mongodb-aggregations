db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { alliance_airline: "$airlines" },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ["$airline.name", "$$alliance_airline"] },
              { $or: [
                { $eq: ["$airplane", "747"] },
                { $eq: ["$airplane", "380"] },
              ] },
            ],
          },
        },
      },
    ],
    as: "totalRotas",
  } },
  { $project: {
    _id: "$name",
    totalRotas: { $size: "$totalRotas" },
  } },
  { $group: {
    _id: "$_id",
    totalRotas: { $sum: "$totalRotas" },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
