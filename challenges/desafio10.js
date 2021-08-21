db.trips.aggregate([
  { $addFields: { duration: { $round: [{ $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] }, 2] } } },
  { $group: { _id: "$usertype", duracaoMedia: { $avg: "$duration" } } },
  { $project: { tipo: "$_id", duracaoMedia: { $round: ["$duracaoMedia", 2] }, _id: 0 } },
  { $sort: { tipo: -1 } },
]);
