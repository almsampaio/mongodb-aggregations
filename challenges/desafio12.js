db.trips.aggregate([
  {
    $group: {
      _id: {
        weekDay: { $dayOfWeek: "$startTime" },
        StationName: "$startStationName",
      },
      total: { $sum: 1 } } },

  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.StationName",
      total: "$total" } },

  { $sort: { total: -1 } },

  { $limit: 1 },
]);
