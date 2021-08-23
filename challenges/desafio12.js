db.trips.aggregate([
  { $addFields: { diaDaSemana: { $dayOfWeek: "$startTime" }, nomeEstacao: "$startStationName" } },
  { $match: { diaDaSemana: { $eq: 5 } } },
  { $group: { _id: "$nomeEstacao", total: { $sum: 1 } } },
  { $project: { _id: 0, nomeEstacao: "$_id", total: "$total" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
