db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      avgDurationMs: {
        $avg: {
          $subtract: ["$stopTime", "$startTime"],
        },
      },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: {
          $divide: ["$avgDurationMs", 1000 * 60],
        },
      },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
