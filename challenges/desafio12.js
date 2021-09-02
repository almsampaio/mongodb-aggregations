db.trips.aggregate([
  {
    $group: {
      _id: { dayOfWeek: { $dayOfWeek: "$startTime" }, startStationName: "$startStationName" },
      total: {
        $sum: 1,
      },
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
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startStationName",
      total: "$total",
    },
  },
]);
