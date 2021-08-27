db.trips.aggregate([
  {
    $group: {
      _id: { startStation: "$startStationName",
        dayOfWeek: { $dayOfWeek: "$startTime" },
      },
      total: { $sum: 1 },
    },
  },
  {
    $project:
    {
      nomeEstacao: "$_id.startStation", total: "$total", _id: 0,
    },
  },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
