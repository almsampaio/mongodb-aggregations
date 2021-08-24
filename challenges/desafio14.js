db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      minutos: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] } },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$minutos" },
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
