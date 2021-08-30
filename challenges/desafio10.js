db.trips.aggregate([
  { $addFields:
    { duracao:
      { $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        (1000 * 60 * 60),
      ] },
    },
  },
  { $group: { _id: "$usertype", duracaoMedia: { $avg: "$duracao" } } },
  { $project:
    {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
