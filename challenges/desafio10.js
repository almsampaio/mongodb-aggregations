db.trips.aggregate([
  { $addFields:
    {
      dateDiff: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          3600000,
        ],
      },
    },
  },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$dateDiff" },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);
