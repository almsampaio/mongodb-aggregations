/* Usando a pipeline anterior que retorna o dia com mais viagens,
determine qual estação tem o maior número de viagens nesse dia da semana.
Exiba apenas o nome da estação e o total de viagens. */
db.trips.aggregate([
  {
    $project: {
      _id: 0,
      dia_Da_Semana: {
        $dayOfWeek: "$startTime",
      },
      startStationName: 1,
    },
  },
  {
    $group: {
      _id: {
        dia_Da_Semana: "$dia_Da_Semana",
        startStationName: "$startStationName",
      },
      tot: { $sum: 1 },
    },
  },
  {
    $sort: { tot: -1 },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startStationName",
      total: "$tot",
    },
  },
]);
