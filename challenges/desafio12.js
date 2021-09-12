db.trips.aggregate([
  { $project: {
    diaDaSemana: { $dayOfWeek: "$startTime" },
    estacao: "$startStationName",
  } },
  { $match: {
    diaDaSemana: 5,
  } },
  { $group: {
    _id: "$estacao",
    soma: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id",
    total: "$soma",
  } },
  { $sort: {
    total: -1,
  } },
  { $limit: 1 },
]);
