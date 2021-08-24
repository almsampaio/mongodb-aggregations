db.trips.aggregate([
  {
    $addFields: {
      duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000] },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
      _id: 0,
    },
  },
  {
    $sort: {
      duracaoMedia: 1,
    },
  },
]);

// https://stackoverflow.com/questions/41138877/how-to-calculate-timestamp-difference-in-mongodb-in-hours
