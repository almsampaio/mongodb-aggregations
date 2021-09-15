db.trips.aggregate([
  {
    $addFields: {
      durationToMinutes: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60 * 1000],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      averageDurationInMinutes: { $avg: "$durationToMinutes" },
    },
  },
  {
    $sort: {
      averageDurationInMinutes: -1,
    },
  },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: {
        $ceil: "$averageDurationInMinutes",
      },
    },
  },
]);
