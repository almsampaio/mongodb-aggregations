db.trips.aggregate([
  { $group: {
    _id: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
      estacao: "$startStationName" },
    qntViagens: { $sum: 1 },
  } },
  { $sort: { qntViagens: -1 } },
  { $limit: 1 },
  { $project: {
    _id: 0, nomeEstacao: "$_id.estacao", total: "$qntViagens",
  } },
]);
