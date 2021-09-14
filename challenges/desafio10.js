db.trips.aggregate([
  {
    $addFields: {
      averageDuration: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 60 * 1000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$averageDuration" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
]);
