db.trips.aggregate(
  [
    { $group:
      {
        _id: "$bikeid",
        duracaoEmMinutos: {
          $avg: { $divide: [{ $subtract: ["$stopTime", "$startTime"] }, 60000] } },
      } },
    { $project:
      {
        _id: 0,
        bikeId: "$_id",
        duracaoMedia: { $ceil: "$duracaoEmMinutos" },
      } },
    { $sort: { duracaoMedia: -1 } },
    { $limit: 5 },
  ],
);
