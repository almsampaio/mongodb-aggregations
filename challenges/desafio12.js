db.trips.aggregate([
  { $project: { diaDaSemana: { $dayOfWeek: "$startTime" }, startStationName: 1 } },
  { $match: { diaDaSemana: 5 } },
  { $group: { _id: "$startStationName", total: { $sum: 1 } } },
  { $project: { nomeEstacao: "$_id", total: "$total", _id: 0 } },
  { $sort: { total: -1 } }, { $limit: 1 },
]);
