db.trips.aggregate(
  [
    {
      $group: {
        _id: "$bikeid",
        duracao: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
      },
    },
    {
      $project: {
        _id: 0,
        bikeId: "$_id",
        duracaoMedia: { $ceil: [{ $divide: ["$duracao", 60 * 1000] }] },
      },
    },
    {
      $sort: {
        duracaoMedia: -1,
      },
    },
    { $limit: 5 },
  ],
);
