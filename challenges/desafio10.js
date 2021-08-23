db.trips.aggregate([
  { $addFields: { duracaoMedia: { $subtract: ["$stopTime", "$startTime"] } } },
  { $group: { _id: "$usertype", duracaoMedia: { $avg: "$duracaoMedia" } } },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [
          { $divide: ["$duracaoMedia", 3600000] },
          2],
      },
    },
  },
  { $sort: { duracaoMedia: 1 } },
]);
