db.trips.aggregate([
  { $group: {
    _id: "$usertype",
    duracao: {
      $avg: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          3600000,
        ],
      },
    },
  } },
  { $project: {
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracao", 2] },
    _id: 0,
  } },
  { $sort: { duracaoMedia: 1 } },
]);
