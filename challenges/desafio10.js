db.trips.aggregate([
  {
    $group: {
      _id: "$usertype",
      averageOfTrip: {
        $avg: {
          $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 3600000],
        },
      },
    },
  },
  { $sort: { averageOfTrip: 1 } },
  {
    $project: {
      _id: false,
      tipo: "$_id",
      duracaoMedia: { $round: ["$averageOfTrip", 2] },
    },
  },
]);
