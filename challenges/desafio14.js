// Desafio 14
db.trips.aggregate([
  {
    $addFields: {
      inMinutes: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 6e4] },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$inMinutes" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: "$duracaoMedia" },
    },
  },
  {
    $sort: {
      duracaoMedia: -1,
    },
  },
  {
    $limit: 5,
  },
]);
