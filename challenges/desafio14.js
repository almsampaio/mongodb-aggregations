db.trips.aggregate([
  { $addFields: { duracaoMedia: { $subtract: ["$stopTime", "$startTime"] } } },
  { $group: { _id: "$bikeid", duracaoMedia: { $avg: { $divide: ["$duracaoMedia", 60000] } } } },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$duracaoMedia" } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
