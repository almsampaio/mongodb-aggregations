db.trips.aggregate([
  {
    $group: {
      _id: "$bikeid",
      time: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 1,
      duracaoMedia: { $ceil: [{ $divide: ["$time", 60000] }] },
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
