db.air_alliances.aggregate(
  [
    { $unwind: "$airlines" },
    { $lookup: {
      from: "air_routes",
      localField: "airlines",
      foreignField: "airline.name",
      as: "airlines_comparison",
    },
    },
    { $unwind: "$airlines_comparison" },
    { $match: {
      $or: [{ "airlines_comparison.airplane": "380" },
        { "airlines_comparison.airplane": "747" },
      ],
    } },
    { $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    } },
    { $sort: {
      totalRotas: -1,
    } },
    { $limit: 1 },
  ],
);
