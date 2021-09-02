db.trips.aggregate([
  {
    $group: {
      _id: { dayOfWeek: { $dayOfWeek: "$startTime" }, endStationName: "$endStationName" },
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
      nomeEstacao: "$_id.endStationName",
      total: "$total",
    },
  },
]);
