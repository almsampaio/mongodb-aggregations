db.trips.aggregate([
  { $project: {
    media: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    _id: 0,
    bikeid: 1,
  } },
  { $group: { _id: "$bikeid", total: { $sum: 1 }, media: { $avg: "$media" } } },
  { $project: { bikeId: "$_id", duracaoMedia: { $ceil: "$media" }, _id: 0 } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
