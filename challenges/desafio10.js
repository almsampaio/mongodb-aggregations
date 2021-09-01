db.trips.aggregate([
  { $addFields: {
    duracaoMedia: { $subtract: ["$stopTime", "$startTime"] },
  } },
  { $group: {
    _id: "$usertype",
    duracaoMedia: {
      $avg: { $divide: ["$duracaoMedia", 3600000] },
    },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);
