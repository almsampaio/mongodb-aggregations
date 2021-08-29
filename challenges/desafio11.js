/* Desafio 11 - Determine qual o dia da semana com maior número de
viagens iniciadas.

Dica: Utilize o operador $dayOfWeek para extrair o dia da semana
como um número de uma data.

O resultado da sua query deve ter exatamente o seguinte formato
(incluindo a ordem dos campos): */
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
