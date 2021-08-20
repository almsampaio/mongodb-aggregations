db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  {
    $lookup: {
      from: "air_routes",
      let: { parceira: "$airlines" },
      pipeline: [
        { $match: { $expr: { $eq: ["$airline.name", "$$parceira"] } } },
        {
          $match: { airplane: { $in: ["747", "380"] } },
        },
      ],
      as: "lalala",
    },
  },
  { $match: { "lalala.0": { $exists: true } } },
  { $unwind: "$lalala" },
  { $group: { _id: "$name", totalRotas: { $sum: 1 } } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
