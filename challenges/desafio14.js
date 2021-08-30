db.trips.aggregate([
  { $addFields: { duracaoViagem: { $subtract: ["$stopTime", "$startTime"] } } },
  { $group: { _id: "$bikeid", duracaoMediaViagem: { $avg: "$duracaoViagem" } } },
  { $project: { bikeId: "$_id", _id: 0, duracaoMedia: { $ceil: { $divide: ["$duracaoMediaViagem", 60000] } } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
