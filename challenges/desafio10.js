db.trips.aggregate([
  {
    $addFields: {
      timeDifference: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
      },
    },
  },
  {
    $group: {
      _id: "$usertype",
      timeAvg: { $avg: "$timeDifference" },
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$timeAvg", 2] },
    },
  },
]);
