db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      duracao: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$duracao", 3600000] }, 2],
      },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);
