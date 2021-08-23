// Determine qual o dia da semana com maior número de viagens iniciadas.
// Dica: Utilize o operador $dayOfWeek para extrair o dia da semana como
// um número de uma data.

db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: { $dayOfWeek: "$startTime" },
    },
  },
  {
    $group: {
      _id: "$dayOfWeek",
      totalTrips: { $sum: 1 },
    },
  },
  {
    $sort: {
      totalTrips: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$totalTrips",
    },
  },
]);
