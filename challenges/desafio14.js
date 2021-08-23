db.trips.aggregate([
  { $addFields:
    {
      dateDiff: {
        $divide: [
          { $subtract: ["$stopTime", "$startTime"] },
          60000,
        ],
      },
    },
  },
  { $group: {
    _id: "$bikeid",
    duracaoMedia: { $avg: "$dateDiff" },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$duracaoMedia" },
  } },
]);
