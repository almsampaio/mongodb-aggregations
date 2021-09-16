db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    durationAVG: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: [{ $divide: ["$durationAVG", 3600000] }, 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);
