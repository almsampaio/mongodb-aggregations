db.trips.aggregate([
  { $project: {
    diaDaSemana: { $dayOfWeek: "$startTime" },
    startStationName: 1,
    _id: 0,
  } },
  { $match: { diaDaSemana: 5 } },
  { $group: {
    _id: "$startStationName",
    total: { $sum: 1 },
  } },
  { $project: {
    nomeEstacao: "$_id",
    _id: 0,
    total: "$total",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
