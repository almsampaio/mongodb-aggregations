const collection = db.trips;

collection.aggregate([
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: {
        $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000] },
      },
    },
  },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$duracaoMedia" } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
