db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    flightDuration: { $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } },
  },
  },
  { $project: { _id: 0, tipo: "$_id", duracaoMedia: { $round: ["$flightDuration", 2] } } },
  { $sort: { duracaoMedia: 1 } },
]);
