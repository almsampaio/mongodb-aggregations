db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
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
      as: "tRotas",
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: {
        $sum: { $size: "$tRotas" },
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
