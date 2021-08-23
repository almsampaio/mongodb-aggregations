db.trips.aggregate([
  {
    $addFields: {
      dayOfWeek: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  { $group: { _id: "$dayOfWeek", total: { $count: {} } } },
  // total deve receber o "$total" ao invés de 1 para ordenar de acordo com o resultado esperado
  // do teste.
  // Ajuda do Murilo Gonçalves para chegar na solução:
  // https://github.com/MuriloGon
  { $project: { diaDaSemana: "$_id", total: "$total", _id: 0 } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
