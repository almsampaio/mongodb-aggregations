db.trips.aggregate([
  { $group: { _id: "$usertype", time: { $avg: { $subtract: ["$stopTime", "$startTime"] } } } },
  { $project: { tipo: "$_id", duracaoMedia: { $round: [{ $divide: ["$time", 3600000] }, 2] }, _id: 0 } },
  { $sort: { duracaoMedia: 1 } },
]);
