/* Desafio 12 - Usando a pipeline anterior que retorna o dia com mais viagens,
determine qual estação tem o maior número de viagens nesse dia da semana.
Exiba apenas o nome da estação e o total de viagens.

Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um
número de uma data. */
db.trips.aggregate([
  { $match: { startTime: { $exists: true } } },
  { $group:
    {
      _id: { $dayOfWeek: "$startTime" },
      total: { $sum: 1 },
    },
  },
  { $project: { _id: false, diaDaSemana: "$_id", total: "$total" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
