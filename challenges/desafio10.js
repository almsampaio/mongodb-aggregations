db.trips.aggregate([
  { $project: {
    usertype: 1,
    diferencaData: {
      $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
    },
  },
  },
  { $group: { _id: "$usertype", media: { $avg: "$diferencaData" } } },
  { $project: { tipo: "$_id", duracaoMedia: { $round: ["$media", 2] }, _id: 0 } },
  { $sort: { duracaoMedia: 1 } },
]);
