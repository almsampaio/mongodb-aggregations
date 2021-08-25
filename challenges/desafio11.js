db.trips.aggregate([
  {
    $addFields: {
      diaDaSemana: { $dayOfWeek: "$startTime" },
    },
  }, // crio um capo dia da semana para depois agrupa-lo
  {
    $group: {
      _id: "$diaDaSemana",
      total: { $sum: 1 }, // conta o registo inteiro,
    },
  },
  {
    $project: {
      diaDaSemana: "$_id",
      total: "$total",
      _id: 0,
    },
  },
  {
    $sort: {
      total: -1, // coloco do maior para o menor assim o primeiro da lista é o maior
    },
  },
  {
    $limit: 1,
  },
]);
