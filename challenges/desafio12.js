db.trips.aggregate([
  {
    $group: {
      _id: { diaDaSemana: { $dayOfWeek: "$startTime" }, nomeDaEstacao: "$startStationName" },
      sum: { $sum: 1 },
    },
  },
  { $project: { _id: 0, nomeEstacao: "$_id.nomeDaEstacao", total: "$sum" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
