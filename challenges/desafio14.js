db.trips.aggregate([
  {
    $addFields: {
      averageDuration: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
      },
    },
  },
  { $group: { _id: "$bikeid", duracaoMedia: { $avg: "$averageDuration" } } },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$duracaoMedia" } } },
  { $sort: { duracaoMedia: -1 } },
]);
