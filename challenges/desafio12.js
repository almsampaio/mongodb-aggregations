db.trips.aggregate([
  {
    $group: {
      _id: { dayWeek: { $dayOfWeek: "$startTime" },
        stationName: "$startStationName" },
      total: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.stationName",
      total: "$total",
    },
  },
  {
    $sort: {
      total: -1,
    },
  },
  {
    $limit: 1,
  },
]);
