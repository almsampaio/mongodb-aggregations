db.trips.aggregate([
  { $addFields: { dayOfWeek: { $dayOfWeek: "$startTime" } } },
  { $group:
    {
      _id:
        {
          dayOfWeek: "$dayOfWeek",
          nomeEstacao: "$startStationName",
        },
      count: { $sum: 1 },
    },
  },
  { $sort: { count: -1 } },
  { $limit: 1 },
  { $project: { _id: 0, nomeEstacao: "$_id.nomeEstacao", total: "$count" } },
]);
