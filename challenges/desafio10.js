db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      time: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: [{ $divide: ["$time", 3600000] }, 2] },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
