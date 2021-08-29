// Determine qual o dia da semana com maior número de viagens iniciadas.
// Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como
// um número de uma data.

db.trips.aggregate([
  { $group: {
    _id: { $dayOfWeek: "$startTime" },
    contador: { $sum: 1 },
  } },
  { $sort: {
    contador: -1,
  } },
  { $limit: 1 },
  { $project: {
    diaDaSemana: "$_id",
    total: "$contador",
    _id: 0,
  } },
]);
