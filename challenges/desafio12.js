db.trips.aggregate([
  {
    $group: {
      _id: {
        startStation: "$startStationName",
        dayOfWeek: { $dayOfWeek: "$startTime" },
      },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startStation",
      total: "$total",
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
