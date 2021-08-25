db.trips.aggregate([
  {
    $addFields: {
      duracao: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      media: { $avg: "$duracao" },
    },
  },
  {
    $project: {
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$media" },
      _id: 0,
    },
  },
  {
    $sort: {
      media: -1,
    },
  },
  {
    $limit: 5,
  },
]);
