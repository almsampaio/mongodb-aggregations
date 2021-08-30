db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duration: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } },
  },
  },
  { $project: { _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$duration", 2] } } },
  { $sort: { duracaoMedia: 1 } },
]);
