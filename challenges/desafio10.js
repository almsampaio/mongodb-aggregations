db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      mediaMs: { $avg: { $subtract: ["$stopTime", "$startTime"] } },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: {
        $round: [{ $divide: ["$mediaMs", 1000 * 60 * 60] }, 2],
      },
    },
  },
]);
