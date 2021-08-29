/* Desafio 12 - Usando a pipeline anterior que retorna o dia com mais viagens,
determine qual estação tem o maior número de viagens nesse dia da semana.
Exiba apenas o nome da estação e o total de viagens.

Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como um
número de uma data.

OBS: No comando $dayOfWeek, 1 representa o domingo e 7 o sábado. */
// Dia 5, sexta-feira

db.trips.aggregate([
  { $addFields: { dayOfWeek: { $dayOfWeek: "$startTime" } } },
  { $match: { dayOfWeek: { $eq: 5 } } },
  { $group:
    {
      _id: "$startStationName",
      total: { $sum: 1 },
    },
  },
  { $project: { _id: false, nomeEstacao: "$_id", total: "$total" } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
