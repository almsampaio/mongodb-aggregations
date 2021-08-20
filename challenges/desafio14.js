db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      mediaEmMS: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $sort: {
      mediaEmMS: -1,
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$mediaEmMS", 1000 * 60] } },
    },
  },
  {
    $limit: 5,
  },
]);
