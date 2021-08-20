db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMediaEmMinutos: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
      },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" },
      _id: 0,
    },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
