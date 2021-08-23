db.trips.aggregate([
  { $addFields: {
    diaDaSemana: { $dayOfWeek: "$startTime" },
    nomeEstacao: "$startStationName",
  } },
  { $match: { diaDaSemana: { $eq: 5 } } },
  { $group: {
    _id: "$nomeEstacao",
    total: { $sum: 1 },
  } },
  { $sort: {
    total: -1,
  } },
  { $project: {
    nomeEstacao: "$_id",
    _id: 0,
    total: "$total",
  } },
  { $limit: 1 },
]);
