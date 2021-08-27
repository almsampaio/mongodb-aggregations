// use("aggregations")

// Pegar a pipeline anterior e fazer os seguintes pontos:
// 1. No $group, agrupar por nome das estações tb
// 2. o restante do fluxo segue os pontos do requisito 11

db.trips.aggregate([
  { $addFields: {
    diaDaPartida: {
      $dayOfWeek: "$startTime",
    },
  } },
  { $group: {
    _id: {
      diaDaPartida: "$diaDaPartida", startStationName: "$startStationName",
    },
    totalViagens: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id.startStationName",
    total: "$totalViagens",
  } },
  { $sort: {
    total: -1,
  } },
  { $limit: 1 },
]);
