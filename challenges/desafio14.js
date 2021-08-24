db.trips.aggregate([
  {
    $addFields: {
      duration: { $round: [{ $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] }, 2] } },
  },
  { $group:
    { _id: "$bikeid", duracaoMedia: { $avg: "$duration" } },
  },
  { $project:
    { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$duracaoMedia" } },
  },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
