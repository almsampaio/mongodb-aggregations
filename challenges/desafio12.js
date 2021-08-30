// Usando a pipeline anterior que retorna o dia com
// mais viagens, determine qual estação tem o maior número de viagens nesse dia da semana.
// Exiba apenas o nome da estação e o total de viagens.
// Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um número de uma data.

db.trips.aggregate([
  { $group: {
    _id: {
      diaSemana: { $dayOfWeek: "$startTime" },
      nomeEstacao: "$startStationName",
    },
    total: { $sum: 1 },
  },
  },
  {
    $match: { "_id.diaSemana": 5 },
  },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id.nomeEstacao",
    total: "$total",
  },
  },
  { $sort: { total: -1 },
  },
  { $limit: 1 },
]);
