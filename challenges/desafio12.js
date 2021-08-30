db.trips.aggregate([
  {
    $group: {
      _id: { day: { $dayOfWeek: "$startTime" }, nomeEstacao: "$startStationName" },
      soma: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.nomeEstacao",
      total: "$soma",
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
