db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  { $sort: { duracaoMedia: 1 } },
  { $project: { tipo: "$_id", _id: 0, duracaoMedia: { $round: [{ $divide: ["$duracaoMedia", (3600000)] }, 2] } } },
]);
