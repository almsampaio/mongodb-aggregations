db.trips.aggregate([
  { $addFields: { duracaoViagem: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] } } },
  { $group: { _id: "$usertype", MediaViagem: { $avg: "$duracaoViagem" } } },
  { $project: { tipo: "$_id", duracaoMedia: { $round: ["$MediaViagem", 2] }, _id: 0 } },
  { $sort: { duracaoMedia: 1 } },
]);
