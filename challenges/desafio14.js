db.trips.aggregate([
  {
    $addFields: {
      duracaoEmMinutos: {
        $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000],
      },
    },
  },
  {
    $group: { _id: "$bikeid", duracaoMediaEmMinutos: { $avg: "$duracaoEmMinutos" } },
  },
  { $project: { _id: 0, bikeId: "$_id", duracaoMedia: { $ceil: "$duracaoMediaEmMinutos" } } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
