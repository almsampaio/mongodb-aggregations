db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { nome: "$airlines" },
      pipeline: [
        { $match: {
          $and:
          [{ $expr: { $eq: ["$airline.name", "$$nome"] } },
            { airplane: { $in: ["380", "747"] } },
          ],
        } },
      ],
      as: "parcerias",
    },
  }, { $unwind: "$parcerias" },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
