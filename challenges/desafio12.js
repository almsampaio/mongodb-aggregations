db.trips.aggregate([
  { $addFields: { startDay: { $dayOfWeek: "$startTime" } } },
  { $match: { startDay: 5 } },
  { $group: { _id: "$startStationName", total: { $sum: 1 } } },
  { $project: { nomeEstacao: "$_id", total: "$total", _id: 0 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

// crio o campo startDay para receber o valor formatado de startTime
// filtro pelo campo criado cujo valor seja 5
// agrupo pelo nome da estação de início da viagem
// projeto o nome da estação e o total de viagens (total de documentos)
// ordeno e limito o resultado a um documento.
