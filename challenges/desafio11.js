// Desafio 9
/* use("aggregations"); */
db.trips.aggregate([
  { $addFields: {
    diaDaPartida: {
      $dayOfWeek: "$startTime",
    },
  } },
  { $group: {
    _id: "$diaDaPartida",
    totalViagens: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$totalViagens",
  } },
  {
    $sort: { total: -1 },
  },
  { $limit: 1 },
]);
