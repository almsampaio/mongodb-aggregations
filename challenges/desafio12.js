db.trips.aggregate([
  {
    $group: {
      _id: {
        weekDay: { $dayOfWeek: "$startTime" },
        station: "$startStationName",
      },
      count: { $sum: 1 },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.station",
      total: "$count",
    },
  },
  { $limit: 1 },
]);
