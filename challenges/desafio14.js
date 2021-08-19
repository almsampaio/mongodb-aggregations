db.trips.aggregate([
  {
    $addFields: {
      tripDuration: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60 * 1000,
        ],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      tripAverageDuration: { $avg: "$tripDuration" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$tripAverageDuration" },
    },
  },
  { $limit: 5 },
  { $sort: { duracaoMedia: -1 } },
]);
