db.trips.aggregate([
  {
    $addFields: {
      milliseconds: { $subtract: ["$stopTime", "$startTime"] },
    },
  },
  {
    $addFields: {
      millisecondsToHours: { $divide: ["$milliseconds", 3600000] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$millisecondsToHours" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);
