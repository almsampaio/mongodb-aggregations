db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      tripAvgTime: {
        $avg: {
          $divide: [
            { $subtract: ["$stopTime", "$startTime"] },
            60 * 1000,
          ],
        },
      },
    },
  },
  {
    $sort: {
      tripAvgTime: -1,
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$tripAvgTime" },
    },
  },
  { $limit: 5 },
]);
