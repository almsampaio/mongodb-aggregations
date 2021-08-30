db.trips.aggregate([
  { $addFields: { startDay: { $dayOfWeek: "$startTime" } } },
  { $group: { _id: "$startDay", total: { $sum: 1 } } },
  { $project: { diaDaSemana: "$_id", total: "$total", _id: 0 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);

// primeiro eu crio um novo campo que recebe o valor formatado pelo $dayOfWeek de startTime.
// depois agrupo os documentos pelo campo criado e crio o campo total, que vai receber
// a soma dos documentos correspondentes.
// depois projeto os campos solicitados, ordeno e limito a um documento.
