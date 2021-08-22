/* Determine qual o dia da semana com maior número de viagens iniciadas. */

db.trips.aggregate([
  {
    $project: {
      _id: 0,
      dia_Da_Semana: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: "$dia_Da_Semana",
      tot: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: "$tot",
    },
  },
  {
    $sort: { total: -1 },
  },
  {
    $limit: 1,
  },
]);
